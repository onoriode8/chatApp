import PopupScreen from "../popup_screen/popup_screen";


import "./clear_chats.css"


const clearChats = ({ fullname, toggle, 
    togglePopupScreenHandler }) => {
    return (
        <div>
            {!toggle && <div onClick={togglePopupScreenHandler}
                >Clear Chats</div>}
            {toggle && <div>
                <PopupScreen 
                    fullname={fullname} tag="Clear Chats" 
                    text="Are you sure you want to delete all 
                        your messages with this user.
                        Deleting messages can't be undo." 
                    cancel={togglePopupScreenHandler}
                />
                </div>}
        </div>
    )
}

export default clearChats;