import PropTypes from "prop-types";


import "./recipientWalletNumber.css";


const recipientWalletNumber = ({recipientDataName, recipientDataBank, 
    recipientDataWalletNumber, setRecipientWalletNumber,
     recipientWalletValue }) => (
    <div>
        <div className="recipientWalletNumber_wrapper">
            <p>Recipient Wallet Number</p>
            <div className="recipientWalletNumber_input_wrapper">
                <input onChange={setRecipientWalletNumber}
                type="number" placeholder="0000000000" 
                />
            </div>
            {recipientWalletValue && <p>enter wallet number to proceed.</p>}
        </div>
        {recipientDataName && recipientDataBank && recipientDataWalletNumber !== null ? 
        <div className="recipientWalletNumber_recipientData_details">
            <div>{recipientDataName}</div>
            <div>{recipientDataBank}</div>
            <div>{recipientDataWalletNumber}</div>
        </div> : null}
    </div>
);

recipientWalletNumber.propTypes = {
    setRecipientWalletNumber: PropTypes.func,
    recipientWalletValue: PropTypes.bool,
    recipientDataName: PropTypes.string,
    recipientDataBank: PropTypes.string,
    recipientWalletNumber: PropTypes.number
}


export default recipientWalletNumber;