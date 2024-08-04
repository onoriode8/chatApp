import React, { useState } from 'react';

import Header from '../../Reuse/header/header';
import { WalletAccount } from '../../Reuse/walletAccount/walletAccount';


const Transfer = ({ navigate }) => {
    
    return (
        <React.Fragment>
            <Header header="Transfer To Baseday" navigate={navigate} />
            <WalletAccount />
        </React.Fragment>
    )
}

export default Transfer