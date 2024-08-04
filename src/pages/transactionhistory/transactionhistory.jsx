import { Link } from "react-router-dom";

import { RiFileListFill } from "react-icons/ri";


import "./transactionhistory.css";


const transactionhistory = ({style}) => (
    <div>
       <div className="transactionhistory_containers">
            <div><RiFileListFill style={style}/></div>
            <Link to="/transaction-history">
            <div className="transactionhistory_div">
                <div>Transaction</div>
                <div>History</div>
            </div>
            </Link>
       </div>
    </div>
);

export default transactionhistory;