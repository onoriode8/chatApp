import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./context";

export const useGetUser = () => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [users, setUsers] = useState([])
    
    const [toggleSearchBar, setToggleSearchBar] = useState(true)

    const navigate = useNavigate()

    const { setToggleSearchBarCont, input, setErrorMessage } = useContext(AuthContext)

    useEffect(() => {
        if(users.length !== 0) return
        if(!parsedData) return
        const fetchAllUsers = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_DB_URL}/user/users/${parsedData.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                if(!response.ok) throw new Error(responseData)
                setUsers(responseData)
            } catch(err) {
                if(err.message === "jwt expired") {
                    sessionStorage.removeItem("cookie-string")
                    sessionStorage.removeItem("chat")
                    navigate("/")
                    window.location.reload()
                } else {
                    setErrorMessage(err.message)
                }
            }
        }
        fetchAllUsers()
    }, [])

    let searchInput = users;
    if(users.length !== 0 && input.length !== 0) {
        searchInput = users.filter(user => user.fullname === input.toLowerCase())
    }

    const toggleSearchBarHandler = () => {
        setToggleSearchBarCont(toggleSearchBar)
        setToggleSearchBar(prevState => !prevState)
    }

    return { 
        users, searchInput, 
        toggleSearchBarHandler
    }
}