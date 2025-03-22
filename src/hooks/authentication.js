import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from './context'

export const useSignup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { imageUrl } = useContext(AuthContext)

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
        if(imageUrl === undefined) return 
        setLoading(true)
        console.log(imageUrl)
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        formData.append("profile", imageUrl)
        try {
            const response = await fetch("http://localhost:5000/signup", formData)
            const responseData = await response.json()
            if(response.ok === false) throw new Error(responseData)
            setLoading(false)
            sessionStorage.setItem("cookie-string", JSON.stringify(responseData.token))
            navigate("/users")
            window.location.reload()
        } catch(err) {
            setLoading(false)
            console.log(err.message)
        }
    }

    return {
        loading, onChangeEmailHandler, 
        onChangePasswordHandler, signupUserHandler
    }
}