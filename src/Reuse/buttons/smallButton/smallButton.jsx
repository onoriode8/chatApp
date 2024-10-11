import PropTypes from 'prop-types'

import "./smallButton.css";


const smallButton = ({ title, click }) => {
    return (
        <button className="smallButton_button" onClick={click}>
            {title}
        </button>
   );
};

smallButton.propTypes = {
    title: PropTypes.string,
    click: PropTypes.func
}

export default smallButton;