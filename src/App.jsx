import { useState } from 'react'
import Landing from './Pages/Landing.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Auth from './Pages/Auth.jsx'
import LinkPage from './Pages/Link.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Layout/AppLayout.jsx'

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
            element: <Dashboard />
          },
          {
            path: '/auth',
            element: <Auth />
          },
          {
            path: '/link/:linkId',
            element: <LinkPage />
          },
        ]
      }
    ]
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
