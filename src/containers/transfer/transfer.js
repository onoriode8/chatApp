import React, { useState } from 'react';

import Header from '../../Reuse/header/header';
import { WalletAccount } from '../../Reuse/walletAccount/walletAccount';
import Amount from '../../Reuse/amount/amount';
import RecipientWalletNumber from '../../pages/recipientWalletNumber/recipientWalletNumber';
import Narration from "../../Reuse/beneficiary/beneficiary";
import LargeButton from '../../Reuse/buttons/largeButton/largeButton';
import Spinner from '../../pages/loading/spinner/spinner';
import Loading from "../../pages/loading/loading";

const Transfer = ({ navigate }) => {
    const [amount, setAmount] = useState(0.0);
    const [amountValue, setAmountValue] = useState(false);
    const [recipientWalletNumber, setRecipientWalletNumber] = useState("");
    const [recipientWalletValue, setRecipientWalletValue] = useState(false);
    
    const [narration, setNarration] = useState("");
    const [loading, setLoading] = useState(false);


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

    }
    return (
        <React.Fragment>
            {loading && <>
                <Spinner />
                <Loading />
            </>}
            <Header header="Transfer To Baseday" navigate={navigate} />
            <WalletAccount />
            <Amount amount={amount} amountValue={amountValue} setAmount={setAmount} />
            <RecipientWalletNumber recipientWalletValue={recipientWalletValue}
                setRecipientWalletNumber={(e)=>setRecipientWalletNumber(e.target.value)}/>
            <Narration setNarration={(e)=>setNarration(e.target.value)} />
            <LargeButton submit={onSubmitTransferHandler} title="Confirm Transaction" />
        </React.Fragment>
    )
}

export default Transfer;