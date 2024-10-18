import PropTypes from "prop-types";



import "./transactionAmount.css";


const transactionAmount = ({amount, fee, total}) => (
    <div className="transactionAmount__wrapper">
        <div className="transactionAmount_amount_wrapper">
            <div>Amount</div>
            <div>N{amount}</div>
        </div>

        <div className="transactionAmount_charges_fee_wrapper">
            <div>Charges (Fee)</div>
            <div>N{fee}</div>
        </div>

        <div className="transactionAmount_total_wrapper">
            <div>Total</div>
            <div>N{total}</div>
        </div>
    </div>
);

transactionAmount.propTypes = {
    amount: PropTypes.number,
    fee: PropTypes.number,
    total: PropTypes.number
}

export default transactionAmount;