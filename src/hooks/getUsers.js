import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./context";


export const useGetUser = () => {
    const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
    const [users, setUsers] = useState([])
    
    const [toggleSearchBar, setToggleSearchBar] = useState(false)
    const [input, setInput] = useState("")

    const navigate = useNavigate()

    const { setToggleSearchBarCont } = useContext(AuthContext)

    useEffect(() => {
        if(users.length !== 0) return
        if(!parsedData) return
        const fetchAllUsers = async() => {
            try {
                const response = await fetch(`http://localhost:5000/user/users/${parsedData.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Bearer " + parsedData.token
                    }
                })
                const responseData = await response.json()
                console.log(responseData)
                if(!response.ok) throw new Error(responseData)
                setUsers(responseData)
            } catch(err) {
                if(err.message === "jwt expired") {
                    sessionStorage.removeItem("cookie-string")
                    navigate("/")
                    window.location.reload()
                } else {
                    console.log(err.message)
                }
            }
        }
        fetchAllUsers()
    }, [])

    let searchInput = users;
    if(users.length !== 0) {
        searchInput = users.filter(user => user.fullname === input)
    }

    console.log(searchInput)

    const toggleSearchBarHandler = () => {
        //dispatch toggleSearchBar to Context Provide.
        setToggleSearchBarCont(toggleSearchBar)
        setToggleSearchBar(prevState => !prevState)
    }

    return { 
        users, searchInput, 
        setInput,  
        toggleSearchBarHandler
    }
}