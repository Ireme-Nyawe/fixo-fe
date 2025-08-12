import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from './components/ScrollTop'
import authService from './state/features/auth/authService'

const App: React.FC = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "null");

  // Connect socket when app starts and user is logged in
  useEffect(() => {
    if (profile) {
      authService.connectSocket();
    }
  }, [profile]);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider >
  )
}

export default App
