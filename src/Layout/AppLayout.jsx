import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen md:px-15 px-4 container  mx-auto '>
        <Header/>
        <Outlet/>
      </main>
      <footer className='bg-gray-800 mt-10 text-white text-center p-4'>
        <p>© 2023 My Application</p>
      </footer>
    </div>
  )
}

export default AppLayout
