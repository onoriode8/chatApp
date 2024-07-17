import { FcMoneyTransfer } from 'react-icons/fc'


import "./transfer.css";


const transfer = ({style}) => (
    <div>
       <div className="transfer_containers">
            <div><FcMoneyTransfer style={style}/></div>
            <div className="transfer_div">
                <div>Transfer</div> 
                <div>Money</div>
            </div>
       </div>
    </div>
);

export default transfer;