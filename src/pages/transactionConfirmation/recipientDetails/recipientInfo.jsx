import PropTypes from 'prop-types';

import "./recipientInfo.css";


const recipientDetails = ({ name, walletNumber, bank, narration, 
    sourceWalletName, sourceWalletNumber }) => (
    <div>
        <div className="">
            <div>Destination Account</div>
            <div className="">
                <div>{name} - </div>
                <div>{walletNumber}</div>
            </div>
        </div>

        <div className="">
            <div>Bank</div>
            <div>{bank}</div>
        </div>

        <div className="">
            <div>Source Account</div>
            <div className="">
                <div>{sourceWalletName} - </div>
                <div>{sourceWalletNumber}</div>
            </div>
        </div>

        <div className="">
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