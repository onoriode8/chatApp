import TransactionAmount from '../transactionAmount/transactionAmount';
import RecipientInfo from "../recipientDetails/recipientInfo";
import TransactionPinEntered from "../transactionPinEntered/transactionPinEntered";

import './transactionConfirm.css';



const transactionConfirm = ({sourceWalletName, amount, narration, 
    sourceWalletNumber, recipientWalletNumber}) => (
    <div>
        <div>
            <header>Transaction Confirmation</header>
            <div>Enter your payment PIN to continue</div>
        </div>
        <TransactionAmount amount={amount} fee={0.00} total={amount} />
        <RecipientInfo name="" walletNumber={recipientWalletNumber} bank="Baseday" narration={narration} 
            sourceWalletName={sourceWalletName} 
            sourceWalletNumber={sourceWalletNumber} />
        <TransactionPinEntered />
    </div>
);


export default transactionConfirm;