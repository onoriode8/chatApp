import PopupScreen from "../../popup_screen/popup_screen";


import "./block.css"


const block = ({ fullname, toggle,
    togglePopupScreenHandler }) => {
    
    return (
        <div>
            {!toggle && <div onClick={togglePopupScreenHandler}
                >Block {fullname}</div>}
            {toggle && <div>
                <PopupScreen 
                    fullname={fullname} tag="Block" 
                    text="This person won't be able to message you,
                    neither will they see your profile.
                    They won't know you blocked them." 
                    cancel={togglePopupScreenHandler}
                />
            </div>}
        </div>
    )
}

export default block;