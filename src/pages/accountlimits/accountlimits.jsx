import { Link } from "react-router-dom";


import { FcClock } from "react-icons/fc";

import "./accountlimits.css";

const accountLimits = ({style}) => (
    <div>
        <div className="accountlimits_containers">
            <div><FcClock style={style}/></div>
            <Link to="/account-limits">
                <div className="accountlimits_div">
                    <div>Account </div>
                    <div> Limits</div>
                </div>
            </Link>
       </div>
    </div>
);

export default accountLimits;