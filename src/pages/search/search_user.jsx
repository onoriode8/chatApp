import { useGetUser } from "../../hooks/getUsers";

import './search_user.css';


const SearchUsers = () => {
    const { users, setInput } = useGetUser()
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