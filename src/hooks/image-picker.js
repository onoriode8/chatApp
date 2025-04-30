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
    // console.log("PICKED IMAGE TO SEND 2", imageUrl, files)

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

    const navigate = useNavigate()


    const updateProfileHandler = async (e) => {
        if(file === undefined && !parsedData) return 
        setLoading(true)
        const formData = new FormData()
        formData.append("updateProfile", file)
        // console.log(file)
        // console.log(parsedData.token)
        try {
            const response = await fetch("http://localhost:5000/user/user/update/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + parsedData.token
                },
                formData
            })
            const responseData = await response.json()
            console.log(response)
            if(response.ok === false) throw new Error(responseData)
            setLoading(false)
            imageUrl = null
            file = null
        } catch(err) {
            setLoading(false)
            file = null
            imageUrl = null
            if(err.message === "jwt expired") {
                sessionStorage.removeItem("cookie-string")
                sessionStorage.removeItem("chat")
                navigate("/")
                window.location.reload()
            } else {
                console.log(err.message)
            }
        }
    }
    
    return {
        updateProfileHandler, loading
    }
}