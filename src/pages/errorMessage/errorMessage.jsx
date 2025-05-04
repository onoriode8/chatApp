import { useContext } from 'react'

import { AuthContext } from '../../hooks/context'

import './errorMessage.css'


const ErrorMessage = () => {
    const { errorMessage, toggleSetErrorMessage } = useContext(AuthContext)

    return (
        <div className="errorMessage__wrapper__">
            {errorMessage && <div className='errorMessage_container_wrapper'>
                <div className="errorMessage_div_wrapper">
                <div className='errorMessage_wrapper'>
                    <div>{errorMessage}</div>
                    <button onClick={toggleSetErrorMessage}>OK</button>
                </div>
                </div>
            </div>}
        </div>
    )
}

export default ErrorMessage;