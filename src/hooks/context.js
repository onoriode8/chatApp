import { useState, useEffect, createContext, useCallback } from 'react';



export const AuthContext = createContext({
    sideDrawer: false,
    toggleSideDrawerHandler: () => {},
    showBalance: false,
    toggleShowBalanceHandler: () => {},
    balance: 0.00,
    fullname: null,
    walletNumber: null,
    token: null,
    email: null,
    username: null,
    image: null,
    friendsref: null,
    error: null,
    errorFun: () => {},
    logout: () => {}
});


export const ContextProvider = (props) => {
    const [showBalance, setShowBalance] = useState(false);
    const [sideDrawer, setSideDrawer] = useState(false);

    //useState for updating user fetch data.
    const [userData, setUserData] = useState({ balance: 0.00, fullname: null,
            walletNumber: null,
            token: null, email: null, username: null, image: null, 
            friendsref: null }); 
    const [error, setError] = useState();

    //useEffect for fetching user data from the server and rendering to UI when the UI gets reloaded.
    useEffect(() => {
        const fetchData = async() => {
          try {
              const response = await fetch("https://jsonplaceholder.typicode.com/users")
              const responseData = await response.json();
              console.log("", response, responseData);
              if(response.ok === false) {
                throw new Error(responseData)
              }
              setUserData(responseData)
          } catch(err) {
              const errorM = "Check your connection!";
              setError(`Something went wrong. ${errorM}` || err.message);
          }
        };
    
        fetchData();
    }, []); 


    const toggleShowBalanceHandler = useCallback(() => {
        const toggle = showBalance;
        setShowBalance(!toggle);
    }, [showBalance]);

    const toggleSideDrawerHandler = useCallback(() => {
        const toggleSideDrawer = sideDrawer;
        setSideDrawer(!toggleSideDrawer);
    }, [sideDrawer]);


    //function to logout user.
    const logoutHandler = () => {
        sessionStorage.removeItem("auth");
        window.location.reload("/");
    }
      


    return (
        <AuthContext.Provider value={{showBalance: showBalance, token: userData.token,
           toggleShowBalanceHandler: toggleShowBalanceHandler, email: userData.email,
           toggleSideDrawerHandler: toggleSideDrawerHandler, username: userData.username,
           balance: userData.balance, fullname: userData.fullname,
           walletNumber: userData.walletNumber, logout: logoutHandler,
           image: userData.image, friendsref: userData.friendsref, error: error, errorFun:() => setError(null),
           sideDrawer: sideDrawer}}>
            {props.children}
        </AuthContext.Provider>
    )
}