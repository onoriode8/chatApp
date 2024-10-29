import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../hooks/context';

import Header from '../../Reuse/header/header';
import { WalletAccount } from '../../Reuse/walletAccount/walletAccount';
import Amount from '../../Reuse/amount/amount';
import RecipientWalletNumber from '../../pages/recipientWalletNumber/recipientWalletNumber';
import NarrationAndBeneficiary from "../../Reuse/beneficiary/beneficiary";
import LargeButton from '../../Reuse/buttons/largeButton/largeButton';
import Spinner from '../../pages/loading/spinner/spinner';
import Loading from "../../pages/loading/loading";
import TransactionConfirm from '../../pages/transactionConfirmation/transactionConfirm/transactionConfirm';


const Transfer = ({ navigate }) => {
    const [amount, setAmount] = useState(0.0);
    const [narration, setNarration] = useState("");
    const [recipientWalletNumber, setRecipientWalletNumber] = useState("");

    //useState for updating recipient Details.
    const [recipientData, setRecipientData] = useState(null);

    const [amountValue, setAmountValue] = useState(false);
    const [recipientWalletValue, setRecipientWalletValue] = useState(false);
    const [loading, setLoading] = useState(false);

    //useState to toggle screenModel for beneficiaryList
    const [toggleOnScreenModel, setToggleOnScreenModel] = useState(false);

    //useState to toggle transfer processes.
    const [changeTransferPage, setChangeTransferPage] = useState(false);

    //useState to entered payment pin to make transfer.
    const [paymentPin, setPaymentPin] = useState("");

    //AuxContext Provider for rendering user data to UI
    const {walletNumber, fullname } = useContext(AuthContext);

    //function to toggle on screenModel on userBeneficiary.
    const toggleOnScreenModelHandler = () => {
        setToggleOnScreenModel(prevState => !prevState)
    }


    const onSubmitTransferHandler = (event) => {
        event.preventDefault();
        if(amount === undefined || amount === 0) 
        {
            setAmountValue(true);
            return;
        };
        if(recipientWalletNumber === undefined ||
            recipientWalletNumber.trim().length === 0) 
        {
            setRecipientWalletValue(true);
            return;
        };

        setLoading(true);
        // const data = {
        //     narration: narration,
        //     recipientWalletNumber: recipientWalletNumber,
        //     amount: amount
        // }
        //fetch request to retrieve user balance 
        //and details before successfull transaction.
        // const fetchUserDataHandler = async() => {
        //     try {
        //         const response = await axios.get("url here")
        //         const responseData = response.json();
        //         if(response.ok === false) {
        //             console.log("Response from server", responseData);
        //             throw new Error(responseData);
        //         }
        //         setUserData(responseData);
        //     } catch(err) {
        //         return err;
        //     }
        // }
        
        // fetchUserDataHandler();
         
        console.log(recipientWalletNumber);
        setLoading(false);

        setChangeTransferPage(true);

    }

    // function to fetch recipient details from 
    //server once the 10 digit wallet number is entered.
    useEffect(() => {
       const fetchRecipientDataHandler = async() => {
           const wallet = recipientWalletNumber.trim().toString()
           if(wallet.length !== 10) return;
           try {
               setLoading(true)
               const response = await axios.get(`url here/${recipientWalletNumber}`)
                const responseData = response.json();
                if(response.ok === false) {
                   console.log("Response from server", responseData);
                   throw new Error(responseData);
                }
                setLoading(false)
                setRecipientData(responseData);
           } catch(err) {
               return err;
           }
       }
       fetchRecipientDataHandler(); 
    }, [recipientWalletNumber]);

        
   //function to entered 5 digits pin and proceed with payment on server.
   useEffect(() => {
        // let parsedToString;
        // if(paymentPin !== null) {
        const parsedToString = paymentPin.toLocaleString();
        //}
        //if(parsedToString === null) return;
       // if(typeof(parsedToString) === "string") {
        if(parsedToString.trim().length !== 5) return;
        //     } else if(parsedToString.trim().length === 5) {
                
        //     }
        // }
        const pinEnteredFunctionHandler = async() => {
            try {
                setLoading(true);
                const paymentPinFormattedToNumber = parsedToString.replace(/[^0-9.-]+/g, "");
                const data = {
                    narration: narration,
                    recipientWalletNumber: recipientWalletNumber,
                    amount: amount, //convert amount to number with the parseFloat() func if its in number.
                    paymentPin: paymentPinFormattedToNumber //valid transaction with payment pin and server pin if correspond.
                }
                const response = await axios.patch("url", data);
                const responseData = await response.json();
                if(response.ok === false) {
                    throw new Error(responseData);
                }
                setLoading(false);
                //render a new page to show "TRANSACTION DONE PROCESS"
                alert("Payment was made successfully")
            } catch(err) {
                return err;
            }
        }
        pinEnteredFunctionHandler()
    }, [paymentPin, amount, narration, recipientWalletNumber]);

    return (
        <React.Fragment>
            {loading && <>
                <Spinner />
                <Loading />
            </>}
            <Header header="Transfer To Baseday" navigate={navigate} />
            {!changeTransferPage && <div>
                <WalletAccount />
                <Amount amount={amount} amountValue={amountValue} setAmount={setAmount} />
                <RecipientWalletNumber recipientWalletValue={recipientWalletValue}
                    setRecipientWalletNumber={(e)=>setRecipientWalletNumber(e.target.value)}
                    recipientDataName={recipientData === null ? null : recipientData.name}
                    recipientDataWalletNumber={recipientData === null ? null : recipientData.walletNumber}
                    recipientDataBank={recipientData === null ? null : recipientData.bank}
                />
                <NarrationAndBeneficiary 
                toggleOnScreenModel={toggleOnScreenModel}
                toggleOnScreenModelHandler={toggleOnScreenModelHandler}
                setNarration={(e)=>setNarration(e.target.value)} />
                <LargeButton submit={onSubmitTransferHandler} title="Confirm Transaction" />
            </div>}
            {changeTransferPage && <div>
                <TransactionConfirm recipientWalletNumber={recipientWalletNumber}
                    narration={narration} amount={amount}
                    sourceWalletName={fullname} sourceWalletNumber={walletNumber}

                    setPaymentPin={setPaymentPin} paymentPin={paymentPin}
                />
            </div>}
        </React.Fragment>
    )
}

export default Transfer;