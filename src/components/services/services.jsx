import Transfer from "../../pages/transfer/transfer";
import TransactionHistory from "../../pages/transactionhistory/transactionhistory";
import AccountLimits from "../../pages/accountlimits/accountlimits";


import "./services.css";



const services = ({styles}) => (
  <div className="services_wrapper_container">
    <div className="services__services">Services</div>
      <div className="services_wrapper">
        <Transfer style={styles} />
        <TransactionHistory style={styles}/>
        <AccountLimits style={styles}/>
      </div>
  </div>
);

export default services;
