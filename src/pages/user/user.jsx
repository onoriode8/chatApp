import { useContext } from "react";

import { useGetUser } from "../../hooks/getUsers";
import UserList from '../userList/userList'
import SearchBar from '../search/search_user'
import { AuthContext } from "../../hooks/context";

import { FaUsers } from "react-icons/fa";

import "./user.css";

const User = () => {
    const { toggleSearchBarCont } = useContext(AuthContext)
    const { users, searchInput } = useGetUser()

    return (
        <div className="user_container_wrapper">
            <div className="user_wrapper">
                <div className="user_total_users_wrapper">
                    <div><FaUsers style={{color: "blue"}} /></div>
                    <div>
                        <div>Total Users</div>
                        <div>{users.length + 1}</div>
                    </div>
                </div>
            </div>
            {toggleSearchBarCont && <div>
                <SearchBar />
            </div>}
            {users.length !== 0 ? 
            //searchInput
            searchInput.map(i => 
            <UserList key={i._id} id={i._id}
                fullname={i.fullname}
                profile={i.profile} />) : null}
        </div>
    )
}

export default User;