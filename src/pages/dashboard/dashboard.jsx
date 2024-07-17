import { useContext } from "react";

import { FaRegEyeSlash } from "react-icons/fa6";

import { AuthContext } from "../../hooks/context";

import "./dashboard.css";

const Dashboard = () => {
  const {showBalance, toggleShowBalanceHandler} = useContext(AuthContext);

  return (
    <div className="dashboard_container">
          <div className="dashboard_currency_amount">            
            <div><strong>NGN {!showBalance ? 1000.00 : "*****"}</strong></div>
          </div>
          <div className="dashboard_account">
            <div>A/c No 1556684957</div>
          </div>
      <div className="dashboard_fullname">
        <div>Full name</div>
        <div>
          <FaRegEyeSlash onClick={toggleShowBalanceHandler}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
