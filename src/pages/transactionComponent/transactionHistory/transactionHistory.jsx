import { useState, useEffect, useContext } from "react";

import TransactionHistoryList from "../transactionHistoryList/transactionHistoryList";
import Header from "../../../Reuse/header/header";
import { AuthContext } from "../../../hooks/context";

const TransactionHistory = ({ navigate }) => {
    const [transactionList, setTransactionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const parsedUserData = useContext(AuthContext)

    useEffect(() => {
        const fetchUserTransactionHistoryList = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://final-year-project-pijh.onrender.com/transaction_history/${parsedUserData.userId}`, {
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer " + parsedUserData.token
                    }
                });
                const responseData = await response.json();
                if(response.ok === false) {
                    throw new Error("Failed to get history.");
                }
                setLoading(false);
                setTransactionList(responseData.transactionHistory);
            } catch(err) {
                setLoading(false)
                setError(err.message);
            }
        }

        fetchUserTransactionHistoryList();
    }, [parsedUserData.userId, parsedUserData.token]);

    let transactionDefault = <p style={{textAlign: "center"}}>
            No Transaction History yet!.
            Your Transaction history will be display here.
        </p>
    if(transactionList.length !== 0) {
        transactionDefault = transactionList.map(item => 
        <TransactionHistoryList navigate={navigate}
            key={item._id} senderName={item.senderName} 
            senderWalletNumber={item.senderWalletNumber} 
            receiverName={item.receiverName} 
            receiverWalletNumber={item.receiverWalletNumber} 
            amountSent={item.amountSent} type={item.type} 
            transactionDate={item.transactionDate} 
            sessionId={item.sessionId} 
            status={item.status} 
        />)
    }

    return (
        <div>
            
        <Header header="Transaction Details" navigate={navigate} />
            {error && <div 
                style={{marginTop: "40px", color: "red",
                fontSize: "18px",
                textAlign: "center"}}
            >{error}</div>}

            {loading && <div 
                style={{marginTop: "40px", 
                textAlign: "center"}}
            >Loading...</div>}

            {transactionDefault}
        </div>
    )
}

export default TransactionHistory;