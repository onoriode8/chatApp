import React, { Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom'

import { ContextProvider, AuthContext } from './hooks/context'

import './App.css'

import ErrorBoundary from './ErrorBoundary';

const Signup = React.lazy(() => import("./components/signup"))
const SignIn = React.lazy(() => import("./components/signin"))

const User = React.lazy(() => import("./pages/user/user"))
const ToolBar = React.lazy(() => import("./pages/toolbar/toolbar"))
const ViewProfile = React.lazy(() => import("./pages/profile/profile"))
const Chat = React.lazy(() => import("./pages/chat/chat"))
const ErrorMessage = React.lazy(() => import("./pages/errorMessage/errorMessage"))


const App = () => {
  // sessionStorage.removeItem("chat")
  // sessionStorage.removeItem("cookie-string")

  const chatData = JSON.parse(sessionStorage.getItem("chat"))
  const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
  const loading = <div className="app_loader_wrapper">
    <span className="app_loader"></span>
  </div>

  const { errorMessage } = useContext(AuthContext)

  return (
    <ContextProvider>
    {/* <ErrorBoundary> */}
    {errorMessage !== null ? <ErrorMessage /> : null }
    {parsedData && <ToolBar />}
      <Routes>
        {!parsedData && <Route path="/" element={
          <Suspense fallback={loading}>
            <SignIn />
          </Suspense>} />}
        {!parsedData && <Route path="/signup" element={
          <Suspense fallback={loading}>
            <Signup />
          </Suspense>} />}
        {parsedData && <Route path="/view-profile" element={
          <Suspense fallback={loading}>
            <ViewProfile />
          </Suspense>} />}
        {parsedData && <Route path="/users" element={
          <Suspense fallback={loading}>
            <User />
          </Suspense>} />}
        {parsedData && <Route path={chatData ? `/chat/${chatData.id}` : null} element={
          <Suspense fallback={loading}>
            <Chat />
          </Suspense>} />}


          {/* <Route path={`/chat/undefined`} element={
          <Suspense fallback={loading}>
            <Chat />
          </Suspense>} /> */}
      </Routes>
      {/* </ErrorBoundary> */}
    </ContextProvider>
  )
}

export default App;