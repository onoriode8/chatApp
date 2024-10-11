
import "./recipientWalletNumber.css";


const recipientWalletNumber = ({ setRecipientWalletNumber, recipientWalletValue }) => (
    <div className="recipientWalletNumber_wrapper">
        <p>Recipient Wallet Number</p>
        <div className="recipientWalletNumber_input_wrapper">
            <input onChange={setRecipientWalletNumber}
               type="number" placeholder="0000000000" 
            />
        </div>
        {recipientWalletValue && <p>enter wallet number to proceed.</p>}
    </div>
);


export default recipientWalletNumber;