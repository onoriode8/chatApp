import PopupScreen from '../../popup_screen/popup_screen';


import './report.css'


const report = ({ fullname, 
    toggle, 
    togglePopupScreenHandler }) => {
    
    return (
        <div>
            {!toggle && <div onClick={togglePopupScreenHandler}
                >Report {fullname}</div>}
            {toggle && <div>
                <PopupScreen 
                    fullname={fullname} tag="Report" 
                    text="The last 5 messages of this 
                        chats will be forwarded to EasyChat.
                        This person won't know you reported them." 
                    cancel={togglePopupScreenHandler}
                />
            </div>}
        </div>
    )
}

export default report;