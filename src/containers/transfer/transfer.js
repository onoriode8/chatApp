import React, { useState } from 'react';

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
    const [amountValue, setAmountValue] = useState(false);
    const [recipientWalletNumber, setRecipientWalletNumber] = useState("");
    const [recipientWalletValue, setRecipientWalletValue] = useState(false);
    
    const [narration, setNarration] = useState("");
    const [loading, setLoading] = useState(false);

    //useState to toggle screenModel for beneficiaryList
    const [toggleOnScreenModel, setToggleOnScreenModel] = useState(false);

    //useState to toggle transfer processes.
    const [changeTransferPage, setChangeTransferPage] = useState(false);

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
        const data = {
            narration: narration,
            recipientWalletNumber: recipientWalletNumber,
            amount: amount
        }
        console.log(recipientWalletNumber);
        setLoading(false);

        setChangeTransferPage(true);

    }
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
                    setRecipientWalletNumber={(e)=>setRecipientWalletNumber(e.target.value)}/>
                <NarrationAndBeneficiary 
                toggleOnScreenModel={toggleOnScreenModel}
                toggleOnScreenModelHandler={toggleOnScreenModelHandler}
                setNarration={(e)=>setNarration(e.target.value)} />
                <LargeButton submit={onSubmitTransferHandler} title="Confirm Transaction" />
            </div>}
            {changeTransferPage && <div>
                <TransactionConfirm />
            </div>}
        </React.Fragment>
    )
}

export default Transfer;