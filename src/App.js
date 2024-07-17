import React, { Suspense } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';


// import HomePage from "./components/homepage/homepage";
// import ProfilePage from "./components/profilePage/profilePage";
import Toolbar from "./pages/Toolbar/toolbar";

import { ContextProvider } from "./hooks/context";

// import asyncComponent from "./containers/asynComponent";

import "./App.css";


const ProfilePage = React.lazy(() => import("./components/profilePage/profilePage"))
const HomePage = React.lazy(() => import("./components/homepage/homepage"))
const Settings = React.lazy(() => import("./components/settings/settings"))
const ChangePasswordComponent = React.lazy(() => import("./components/ChangePasswordComponent/ChangePasswordComponent"));


function App() {
  const navigate = useNavigate();

  const styles = {
    fontSize: "1.6em",
  };

  const userId = 2568456788;

  const loading = <p>Loading...</p>

  return (
    <ContextProvider>
      <Toolbar styles={styles} />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={loading}>
            <HomePage />
          </Suspense>} />
        <Route path={`/profile/${userId}`} element={
          <Suspense fallback={loading}>
            <ProfilePage navigate={() => navigate(-1)} />
          </Suspense>} />
        <Route path="/settings" element={
          <Suspense fallback={loading}>
            <Settings navigate={() => navigate(-1)} />
          </Suspense>} />
        <Route path="/change_password/userId" element={
          <Suspense fallback={loading}>
            <ChangePasswordComponent navigate={() => navigate(-1)} />
          </Suspense>} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
