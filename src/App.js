import React, { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

import Toolbar from "./pages/Toolbar/toolbar";
import ErrorBoundary from "./containers/errorBoundary";

import { ContextProvider } from "./hooks/context";

import "./App.css";

const ProfilePage = React.lazy(() =>
  import("./components/profilePage/profilePage")
);
const HomePage = React.lazy(() => import("./components/homepage/homepage"));
const Settings = React.lazy(() => import("./components/settings/settings"));
const ChangePasswordComponent = React.lazy(() =>
  import("./components/ChangePasswordComponent/ChangePasswordComponent")
);
const ErrorMessage = React.lazy(() => import("./pages/errorMessage/errorMessage"));
const Transfer = React.lazy(() => import("./containers/transfer/transfer"));

const SignIn = React.lazy(() => import("./containers/authentication/signIn"));
const SignUp = React.lazy(() => import("./containers/authentication/signup"));


function App() {

  // const fetchData = () =>
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(response => {
  //       console.log("RESPONSE", response.json());
  //       response.json();
  // });

  // const { isLoading, error, data } = useQuery("fetchData", fetchData());

  // const [userData, setUserData] = useState(null);

  // console.log("ISLOADING", isLoading);
  // console.log("ERROR", error);
  // console.log("DATA", data);

  // const { error, errorFun } = useContext(AuthContext);

  const navigate = useNavigate();

  const styles = {
    fontSize: "1.6em"
  }

  const userId = 2568456788;

  const loading = <p>Loading...</p>

  
  return (
    <React.Fragment>
      { userId ? <Routes>
        <Route path="/" element={<Suspense fallback={loading}><SignIn /></Suspense>} />
        <Route path="/signup/new-user" element={<Suspense fallback={loading}><SignUp /></Suspense>} />
      </Routes> :
      <ErrorBoundary>
        <ContextProvider>
          <Toolbar styles={styles} />
          <ErrorMessage  />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={loading}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={`/profile/${userId}`}
              element={
                <Suspense fallback={loading}>
                  <ProfilePage navigate={() => navigate(-1)} />
                </Suspense>
              }
            />
            <Route
              path="/settings"
              element={
                <Suspense fallback={loading}>
                  <Settings navigate={() => navigate(-1)} />
                </Suspense>
              }
            />
            <Route
              path="/change_password/userId"
              element={
                <Suspense fallback={loading}>
                  <ChangePasswordComponent navigate={() => navigate(-1)} />
                </Suspense>
              }
            />
            <Route path="/transfer-money" element={
              <Suspense fallback={loading}>
                <Transfer navigate={() => navigate(-1)} />
            </Suspense>} />
          </Routes>
        </ContextProvider>
      </ErrorBoundary>}
    </React.Fragment>
  );
}

export default App;
