import "./beneficiaryList.css";


const beneficiaryList = ({ name, bank, walletNumber }) => (
  <div>
    <div className="beneficiaryList_container">
      <div><strong>{name}</strong></div>
      <div>{bank}</div>
      <div>({walletNumber})</div>
    </div>
  </div>
);

export default beneficiaryList;
