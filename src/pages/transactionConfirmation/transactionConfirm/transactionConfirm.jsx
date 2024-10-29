import TransactionAmount from '../transactionAmount/transactionAmount';
import RecipientInfo from "../recipientDetails/recipientInfo";
import TransactionPinEntered from "../transactionPinEntered/transactionPinEntered";

import './transactionConfirm.css';



const transactionConfirm = ({ sourceWalletName, amount, narration, 
    sourceWalletNumber, recipientWalletNumber, paymentPin, setPaymentPin }) => {

        let parsedAmount;
        if(typeof(amount) === 'string') {
            const Amount = amount.replace(/[^0-9.-]+/g, "");
            parsedAmount = +Amount;
        }
        
    return (
        <div>
            <div className="transactionConfirm_text_">
                <header>Transaction Confirmation</header>
                <div>Enter your payment PIN to continue</div>
            </div>
            <TransactionAmount amount={parsedAmount} fee={0.00} total={parsedAmount} />
            <RecipientInfo name="" walletNumber={recipientWalletNumber} bank="Baseday" narration={narration} 
                sourceWalletName={sourceWalletName} 
                sourceWalletNumber={sourceWalletNumber} />
            <TransactionPinEntered paymentPin={paymentPin} setPaymentPin={setPaymentPin} />
        </div>
    );

}


export default transactionConfirm;