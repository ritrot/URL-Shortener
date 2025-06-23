import { useState } from 'react'
import Landing from './Pages/Landing.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Auth from './Pages/Auth.jsx'
import LinkPage from './Pages/Link.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Layout/AppLayout.jsx'
import UrlProvider from './Contextapi.jsx'
import supabase from './db/supabase.js'
import Require from './components/Require.jsx'
function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Landing />
          },
          {
            path: '/dashboard',
            element:<Require><Dashboard /></Require> 
          },
          {
            path: '/auth',
            element: <Auth />
          },
          {
            path: '/link/:linkId',
            element: <Require><LinkPage /></Require> 
          },
        ]
      }
    ]
  )
  return (
    <>
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </>
  )
}

export default App
