import { useContext } from "react";


import { AuthContext } from "../../hooks/context";

import "./walletAccount.css";


export const WalletAccount = ({ parsedUserData }) => {
    const { fullname, balance } = useContext(AuthContext);


    // let userBalance = <div>0.00</div>
    // if(balance > 0) {
    //     userBalance = <div>{balance}</div>
    // };

    
    return (
       <div className="walletAccount_container">
            <p>Wallet Account - {parsedUserData.fullname}</p>
            <div className="walletAccount_balance_wrapper">
                <div>Balance: <strong>N</strong></div>
                <strong>{parsedUserData.balance}</strong>
                {/* {userBalance} */}
            </div>
       </div> 
    )
}