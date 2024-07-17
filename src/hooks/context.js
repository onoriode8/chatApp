import { useState, useEffect, createContext, useCallback } from 'react';



export const AuthContext = createContext({
    sideDrawer: false,
    toggleSideDrawerHandler: () => {},
    showBalance: false,
    toggleShowBalanceHandler: () => {},
    token: null,
    logout: () => {}
});


export const ContextProvider = (props) => {
    const [showBalance, setShowBalance] = useState(false);
    const [sideDrawer, setSideDrawer] = useState(false);
    const [token, setToken] = useState(null);


    const toggleShowBalanceHandler = useCallback(() => {
        const toggle = showBalance;
        setShowBalance(!toggle);
    }, [showBalance]);

    const toggleSideDrawerHandler = useCallback(() => {
        const toggleSideDrawer = sideDrawer;
        setSideDrawer(!toggleSideDrawer);
    }, [sideDrawer]);

    useEffect(() => {
        console.log("RUN ALWAYS");
        
    });

    return (
        <AuthContext.Provider value={{showBalance: showBalance, 
           toggleShowBalanceHandler: toggleShowBalanceHandler,
           toggleSideDrawerHandler: toggleSideDrawerHandler,
           sideDrawer: sideDrawer}}>
            {props.children}
        </AuthContext.Provider>
    )
}