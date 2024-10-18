import { FaUsers } from "react-icons/fa6";

import ScreenModel from "../screenModel/screenModel";
import Backdrop from '../../pages/loading/loading';

import "./beneficiary.css";


const beneficiary = ({setNarration, toggleOnScreenModelHandler,
     toggleOnScreenModel}) => (
    <div>
    {toggleOnScreenModel ?
        <div>
            <Backdrop toggleOnScreenModelHandler={toggleOnScreenModelHandler}/>
            <ScreenModel toggleOnScreenModelHandler={toggleOnScreenModelHandler}/>
        </div>
    : null}
    <div className="beneficiary_wrapper">
        {!toggleOnScreenModel && <div className="beneficiary_icon_wrapper" onClick={toggleOnScreenModelHandler}>
            <span><FaUsers /></span>
            <div>select from Beneficiaries</div>
        </div>}
        <div>
            <p>Narration</p>
            <div className="beneficiary_narration_input_wrapper">
                <input type="text" onChange={setNarration} placeholder="Enter Narration" />
            </div>
        </div>
    </div>
    </div>
);

export default beneficiary;