import PropTypes from 'prop-types'
import { IoIosArrowBack } from 'react-icons/io';

import "./header.css";


const header = ({ header, navigate }) => (
    <header className="header_container">
        <IoIosArrowBack className="header_backarrowIcon" onClick={navigate} />
        <div>{header}</div>
    </header>
);


header.propTypes = {
    header: PropTypes.string
}

export default header;