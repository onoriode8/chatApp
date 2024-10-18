import TransactionAmount from '../transactionAmount/transactionAmount';
import RecipientInfo from "../recipientDetails/recipientInfo";
import TransactionPinEntered from "../transactionPinEntered/transactionPinEntered";

import './transactionConfirm.css';



const transactionConfirm = () => (
    <div>
        <div>
            <header>Transaction Confirmation</header>
            <div>Enter your payment PIN to continue</div>
        </div>
        <TransactionAmount amount="" fee="" total="" />
        <RecipientInfo name="" walletNumber="" bank="" narration="" 
            sourceWalletName="" sourceWalletNumber="" />
        <TransactionPinEntered />
    </div>
);


export default transactionConfirm;