import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";


import { AuthContext } from './context'


export const useImagePicker = () => {
    const [files, setFiles] = useState()
    const [imageUrl, setImageUrl] = useState()

    const { pickedFile, setFilePicker } = useContext(AuthContext)
    const imageRef = useRef()

    const openFileHandler = () => {
        imageRef.current.click()
    }

    const filePickerHandler = (e) => {
        e.preventDefault()
        const File = e.target.files[0]
        if(!File) return
        setFiles(File)
    }

    useEffect(() => {
        if(!files && !pickedFile) return
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const result = e.target.result
            setFilePicker(files)
            setImageUrl(result)
        }
        fileReader.readAsDataURL(files)
    }, [files, pickedFile, setFilePicker])
    
    return {
        imageUrl, imageRef, files,
        openFileHandler, filePickerHandler
    }
}


export const useUploadProfile = (file, imageUrl) => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const updateProfileHandler = async (e) => {
        if(file === undefined && !parsedData) return 
        setLoading(true)
        const formData = new FormData()
        formData.append("updateProfile", file)
        try {
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/user/update/profile`, {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + parsedData.token
                },
                body: formData
            })
            const responseData = await response.json()
            if(response.ok === false) {
                if(responseData.statusCode === 429) {
                    const error = new Error(responseData.error)
                    error.status = responseData.statusCode
                    throw error;
                }
                throw new Error(responseData)
            }
            setLoading(false)
            imageUrl = null
            file = null
            setMessage(responseData)
            setTimeout(() => {
                setMessage(null)
            }, 1500)
            setTimeout(() => {
                navigate("/users")
                window.location.reload()
            }, 3000)
        } catch(err) {
            setLoading(false)
            file = null
            imageUrl = null
            setMessage(err.message)
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } else {}
        }
    }
    
    return {
        updateProfileHandler, loading, message
    }
}