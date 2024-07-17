import { FcClock } from "react-icons/fc";

import "./accountlimits.css";

const accountLimits = ({style}) => (
    <div>
        <div className="accountlimits_containers">
            <div><FcClock style={style}/></div>
            <div className="accountlimits_div">
                <div>Account </div>
                <div> Limits</div>
            </div>
       </div>
    </div>
);

export default accountLimits;