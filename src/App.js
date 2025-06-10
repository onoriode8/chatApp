import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'

import { ContextProvider } from './hooks/context'

import './App.css'

import ErrorBoundary from './ErrorBoundary';

const Signup = React.lazy(() => import("./components/signup"))
const SignIn = React.lazy(() => import("./components/signin"))

const User = React.lazy(() => import("./pages/user/user"))
const ToolBar = React.lazy(() => import("./pages/toolbar/toolbar"))
const ViewProfile = React.lazy(() => import("./pages/profile/profile"))
const Chat = React.lazy(() => import("./pages/chat/chat"))
const ErrorMessage = React.lazy(() => import("./pages/errorMessage/errorMessage"))
const ChatProfile = React.lazy(() => import("./pages/chat/more/chat_details/chat_details"))
const ChatLoader = React.lazy(() => import("./pages/loader/chatLoader/chatLoader"))

const App = () => {

  const chatData = JSON.parse(sessionStorage.getItem("chat"))
  const parsedData = JSON.parse(sessionStorage.getItem("cookie-string"))
  const loading = <div className="app_loader_wrapper">
    <span className="app_loader"></span>
  </div>
  
  return (
    <ContextProvider>
    <ErrorMessage />
    {parsedData && <ToolBar />}
      <Routes>
        {!parsedData && <Route path="/" element={
          <Suspense fallback={loading}>
            <SignIn />
          </Suspense>} />}
        !{parsedData && <Route path="/signup" element={
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
        {parsedData && <Route path={`/chat_profile`} element={
          <Suspense fallback={loading}>
            <ChatProfile />
          </Suspense>}/>}

        {/* {parsedData && <Route path="chat_loader" element={
          <Suspense fallback={loading}>
            <ChatLoader />
          </Suspense>}/>} */}
      </Routes>
      {/* </ErrorBoundary> */}
    </ContextProvider>
  )
}

export default App;
