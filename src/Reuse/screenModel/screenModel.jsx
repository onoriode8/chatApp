import BeneficiaryList from "../beneficiary/beneficiaryList/beneficiaryList.jsx";

import { MdCancel } from "react-icons/md";

import "./screenModel.css";


const BeneficiariesList = [
    {
        name: "Onoriode David",
        bank: "Baseday",
        walletNumber: 1234567890,
        id: 1
    },
    {
        name: "Umukoro Favor",
        bank: "Baseday",
        walletNumber: 1234567890,
        id: 2
    },
    {
        name: "Onoriode Umukoro",
        bank: "Baseday",
        walletNumber: 1234567890,
        id: 3
    }
];

const screenModel = ({toggleOnScreenModelHandler}) => (
    <div className="screenModel_wrapper_container">
        <div className="screenModel_header_wrapper">
            <div></div>
            <header>Beneficiaries</header>
            <div className="div"><MdCancel onClick={toggleOnScreenModelHandler}/></div>
        </div>
        {BeneficiariesList.flatMap(value => <BeneficiaryList 
            key={value.id} name={value.name} bank={value.bank} 
            walletNumber={value.walletNumber} />)
        }
    </div>
);

export default screenModel;