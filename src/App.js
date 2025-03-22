import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'

import { ContextProvider } from './hooks/context'

const SignIn = React.lazy(() => import("./components/signin/signin"))

const App = () => {
  const loading = <p style={{color: "green"}}>Loading...</p>
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Suspense fallback={loading}><SignIn /></Suspense>} />
      </Routes>
    </ContextProvider>
  )
}

export default App;