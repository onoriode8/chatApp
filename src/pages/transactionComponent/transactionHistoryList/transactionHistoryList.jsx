

import "./transactionHistoryList.css";

const transactionHistoryList = ({
        senderName, senderWalletNumber, receiverName,
        receiverWalletNumber, amountSent, type, navigate,
        transactionDate, sessionId, status, description }) => {
    return (
    <div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div className="transactionHistory_header_wrapper">
                <div>Transfer to {receiverName.toUpperCase()}</div>
                <div style={{fontSize: "26px"}}><strong>N{amountSent.toLocaleString()}</strong></div> 
                <div style={{color: "green"}}>{status}</div>
            </div>
        </div>
        <div className="transactionHistory_transaction_details">
            <div><strong>Transaction Details</strong></div>
            <div className="transactionHistory__details">
                <div>Recipient Name</div>
                <div>{receiverName}</div>
            </div>

            <div className="transactionHistory__details">
                <div>Recipient wallet Number</div>
                <div>{receiverWalletNumber}</div>
            </div>

            <div className="transactionHistory__details">
                <div>Description</div>
                <div>{description}</div>
            </div>

            <div className="transactionHistory__details">
                <div>Transaction Type</div>
                <div>{type}</div>
            </div>

            <div className="transactionHistory__details">
                <div>Transaction Date</div>
                <div>{transactionDate}</div>
            </div>

            <div className="transactionHistory__details">
                <div>Session Id</div>
                <div>{sessionId}</div>
            </div>
            <hr />
        </div>
    </div>
);
        }

export default transactionHistoryList;