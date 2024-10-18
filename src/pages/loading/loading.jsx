import PropTypes from "prop-types";

import "./loading.css";



const loading = ({toggleOnScreenModelHandler}) => (
    <div className="loading_loading" onClick={toggleOnScreenModelHandler}></div>
);

loading.propTypes = {
    toggleOnScreenModelHandler: PropTypes.func
};

export default loading;