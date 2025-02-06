import { useContext } from "react";


import { AuthContext } from "../../hooks/context";

import "./walletAccount.css";


export const WalletAccount = ({ parsedUserData }) => {
    const { balance } = useContext(AuthContext);


    let userUpdatedBalance = balance;
    // if(!balance || balance === null || balance === undefined || balance < 1) {
    //     userUpdatedBalance = balance
    // };

    
    return (
       <div className="walletAccount_container">
            <p>Wallet Account - {parsedUserData.fullname ? parsedUserData.fullname.toUpperCase() : null}</p>
            <div className="walletAccount_balance_wrapper">
                <div>Balance: <strong>N</strong></div>
                <strong>{userUpdatedBalance}</strong>
            </div>
       </div> 
    )
}