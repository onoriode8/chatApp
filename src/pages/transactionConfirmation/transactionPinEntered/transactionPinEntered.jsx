import PropTypes from "prop-types";

import "./transactionPinEntered.css";


const transactionPinEntered = ({ setPaymentPin, paymentPin }) => (
    <div className="transactionPinEntered_wrapper">
        <div className="transactionPinEntered_input_wrapper">
            <input type="number" placeholder="00000" 
              onChange={paymentPin.trim().length <= 4 ? (e)=> {
                setPaymentPin(e.target.value)} : null}
            />
        </div>

        <div>
            <p>Enter Your Transaction Pin</p>
        </div>
    </div>
);

transactionPinEntered.propTypes = {
    paymentPin: PropTypes.string,
    setPaymentPin: PropTypes.func
}

export default transactionPinEntered;