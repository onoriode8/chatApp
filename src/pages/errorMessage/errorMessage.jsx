import { useContext } from 'react'

import { AuthContext } from '../../hooks/context'

import './errorMessage.css'


const ErrorMessage = () => {
    const { errorMessage, setErrorMessage } = useContext(AuthContext)
    
    return (
        <div className='errorMessage_container_wrapper'>
            <div className="errorMessage_div_wrapper">
            <div className='errorMessage_wrapper'>
                <div>{errorMessage}</div>
                <button onClick={setErrorMessage}>OK</button>
            </div>
            </div>
        </div>
    )
}

export default ErrorMessage;