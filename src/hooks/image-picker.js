import { useState, useEffect, useRef, useContext } from "react";

import { AuthContext } from './context'

export const useImagePicker = () => {
    const [file, setFile] = useState()
    const [imageUrl, setImageUrl] = useState()

    const { setImageUrlPreview } = useContext(AuthContext)
    const imageRef = useRef()

    const openFileHandler = () => {
        imageRef.current.click()
    }

    const filePickerHandler = (e) => {
        e.preventDefault()
        const File = e.target.files[0]
        if(!File) return
        setFile(File)
    }

    useEffect(() => {
        if(!file) return
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const result = e.target.result
            setImageUrlPreview(result)
            setImageUrl(result)
        }
        fileReader.readAsDataURL(file)
    }, [file, setImageUrlPreview])
    
    return {
        imageUrl, imageRef, 
        openFileHandler, filePickerHandler
    }
}