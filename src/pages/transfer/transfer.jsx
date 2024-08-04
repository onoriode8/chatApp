import { Link } from "react-router-dom";

import { FcMoneyTransfer } from 'react-icons/fc'


import "./transfer.css";


const transfer = ({style}) => (
    <div>
       <div className="transfer_containers">
            <div><FcMoneyTransfer style={style}/></div>
            <Link to="/transfer-money">
                <div className="transfer_div">
                    <div>Transfer</div> 
                    <div>Money</div>
                </div>
            </Link>
       </div>
    </div>
);

export default transfer;