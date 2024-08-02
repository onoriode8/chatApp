
import Loading from "../loading/loading";


import "./errorMessage.css";


const error = ({ error, errorFun }) => {

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
};

export default error;
