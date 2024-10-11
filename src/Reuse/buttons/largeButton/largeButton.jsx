import PropTypes from "prop-types";


import "./largeButton.css"


const largeButton = ({ title, submit }) => (
    <div className="largeButton_wrapper">
        <button onClick={submit}>{title}</button>
    </div>
);

largeButton.propTypes = {
    title: PropTypes.string,
    submit: PropTypes.func
}

export default largeButton;