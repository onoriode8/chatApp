import React, { useContext } from "react";

import Loading from '../loading/loading'; 
import { AuthContext } from "../../hooks/context";

import "./errorMessage.css";


const ErrorMessage = () => {
  const {error, errorFun } = useContext(AuthContext)

  return (
    <div>
        {error ? <Loading /> : null}
        {error ? <div className="errorMessage_wrapper">
            <div className="errorMessage_message">
                <p>{error}</p>
                <button onClick={errorFun}><strong>OK</strong></button>
            </div> 
        </div> : null}
    </div>
    );
}



export default ErrorMessage;