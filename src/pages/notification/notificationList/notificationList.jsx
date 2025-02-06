import "./notificationList.css";

const notificationList = (props) => {
    return (
        <div style={{textAlign: "center"}}>
            <div className="notification_container_wrapper">
                <div>
                    <p><strong>{props.message.toUpperCase()}</strong></p>
                    {/* <p>Here goes the IP address used to register this account.</p> */}
                    <p>{props.ip}</p>
                    <p><strong>{props.date}</strong></p>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default notificationList;