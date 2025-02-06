import React from 'react';

import SettingsPage from '../../pages/settingspage/settingspage';


const Settings = ({ navigate, parsedUserData }) => {

    return (
    <div>
        <SettingsPage  navigate={navigate}
         parsedUserData={parsedUserData} />
    </div>
);
    }
export default Settings;