import { RiFileListFill } from "react-icons/ri";


import "./transactionhistory.css";


const transactionhistory = ({style}) => (
    <div>
       <div className="transactionhistory_containers">
            <div><RiFileListFill style={style}/></div>
            <div className="transactionhistory_div">
                <div>Transaction</div>
                <div>History</div>
            </div>
       </div>
    </div>
);

export default transactionhistory;