import ProfileDetails from "../../pages/profileDetails/profileDetails";


const profilePage = ({ navigate, parsedUserData }) => (
    <div>
        <ProfileDetails navigate={navigate} parsedUserData={parsedUserData} />
    </div>
);

export default profilePage;