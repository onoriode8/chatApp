
import "./popup_screen.css"


const popupScreen = ({ tag, text, fullname, cancel }) => (
    <div>
        <div className="popupScreen_wrapper__cont_backdrop"></div>
    <div className="popupScreen_wrapper_cont">
        <div className="popupScreen_wrapper">
            <div className="popupScreen_text_wrapper">
                <h2>{tag} {fullname}?</h2>
                <p>{text}</p>
            </div>
            <div>
                <button>{tag}</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>
    </div>
    </div>
)

export default popupScreen;