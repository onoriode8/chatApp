import { useContext } from 'react'

import { AuthContext } from '../../hooks/context';
import { useGetUser } from "../../hooks/getUsers";

import './search_user.css';


const SearchUsers = () => {
    const { users } = useGetUser()
    const { setInput } = useContext(AuthContext)
    
    return (
        <div className="searchUsers_wrapper">
            {users.length !== 0 ? 
                <input type="search" 
                    onChange={(e) => 
                    setInput(e.target.value)}
                    placeholder="search user" /> : null
            } 
        </div>
    )
}

export default SearchUsers;