import { useContext } from "react";

import { FaRegEyeSlash } from "react-icons/fa6";

import { AuthContext } from "../../hooks/context";

import "./dashboard.css";

const Dashboard = ({ parsedUserData }) => {
  const {showBalance, toggleShowBalanceHandler, balance} = useContext(AuthContext);

  //check for updated balance and render to dashboard otherwise fall back to default balance.
  let userUpdatedBalance = parsedUserData.balance;
  if(!balance || balance === null || balance === undefined || balance < 1) {
    userUpdatedBalance = balance
  }

  return (
    <div className="dashboard_container">
          <div className="dashboard_currency_amount">            
            <div><strong>NGN {!showBalance ? userUpdatedBalance : "*****"}</strong></div>
          </div>
          <div className="dashboard_account">
            <div>A/c No {parsedUserData.walletNumber}</div>
          </div>
      <div className="dashboard_fullname">
        <div>{parsedUserData.fullname}</div>
        <div>
          <FaRegEyeSlash onClick={toggleShowBalanceHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
