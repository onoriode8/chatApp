import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'


import { AuthContext } from './context'


export const useSignup = () => { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)


    const navigate = useNavigate()

    // const { files } = useImagePicker()
    const { pickedFile, setFilePicker } = useContext(AuthContext)

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const signupUserHandler = async (e) => {
        e.preventDefault()
        if(email.trim().length < 6 && 
            password.trim().length < 5) return
        if(pickedFile === undefined) return 
        setLoading(true)
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        formData.append("userProfile", pickedFile)
        try {
            // console.log("url", process.env.REACT_APP_DB_URL)
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/signup`, {
                method: "POST",
                body: formData
            })
            const responseData = await response.json()
            if(response.ok === false) throw new Error(responseData)
            setLoading(false)
            setEmail("")
            setPassword("")
            setFilePicker(null)
            sessionStorage.setItem("cookie-string",
                 JSON.stringify({
                    token: responseData.token,
                    id: responseData.id
                })
            )
            navigate("/users")
            window.location.reload()
        } catch(err) {
            setLoading(false)
            setEmail("")
            setPassword("")
            setFilePicker(null)
            setErrorMessage(err.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    return {
        loading, email, password, errorMessage,
         onChangeEmailHandler, 
        onChangePasswordHandler, signupUserHandler
    }
}


export const useSignin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const signInUserHandler = async (e) => {
        e.preventDefault()
        if(email.trim().length < 6 && 
            password.trim().length < 5) return
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const responseData = await response.json()
            if(response.ok === false) throw new Error(responseData)
            setLoading(false)
            setEmail("")
            setPassword("")
            sessionStorage.setItem("cookie-string",
                 JSON.stringify({
                    token: responseData.token,
                    id: responseData.user._id
                })
            )
            navigate("/users")
            window.location.reload()
        } catch(err) {
            setLoading(false)
            setEmail("")
            setPassword("")
            setErrorMessage(err.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    return {
        loading, email, password, errorMessage,
        onChangeEmailHandler, 
        onChangePasswordHandler, signInUserHandler
    }
}