import PropTypes from 'prop-types';

import "./recipientInfo.css";


const recipientDetails = ({ name, walletNumber, bank, narration, 
    sourceWalletName, sourceWalletNumber }) => (
    <div>
        <div className="recipientDetails_destination_account">
            <div>Destination Account</div>
            <div className="recipientDetails_name_walletNumber">
                <div>{name} Favor right - </div>
                <div>{walletNumber}</div>
            </div>
        </div>

        <div className="recipientDetails_bank">
            <div>Bank</div>
            <div>{bank}</div>
        </div>

        <div className="recipientDetails_sourceAccount_wrapper">
            <div>Source Account</div>
            <div className="recipientDetails_sourceWalletName_sourceWalletNumber">
                <div>{sourceWalletName} onoriode umukoro - </div>
                <div>{sourceWalletNumber} 9070351944</div>
            </div>
        </div>

        <div className="recipientDetails_narration">
            <div>Narration</div>
            <div>{narration}</div>
        </div>
    </div>
);

recipientDetails.propType = {
    name: PropTypes.string,
    walletNumber: PropTypes.number,
    bank: PropTypes.string,
    narration: PropTypes.string,
    sourceWalletName: PropTypes.string,
    sourceWalletNumber: PropTypes.number
}

export default recipientDetails;