import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { UrlState } from '../Contextapi'

const Auth = () => {
  const [paramSearch] = useSearchParams()
  const longLink = paramSearch.get("createNew");
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState()
  console.log(isAuthenticated, loading);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]
  )



  return (
    <div className='flex justify-center mt-36 gap-10 items-center flex-col'>
      <div className='text-6xl font-extrabold '>
        {longLink ? "Login first" : "Ok to go forward"}
      </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login /></TabsContent>
        <TabsContent value="register"><Signup /></TabsContent>
      </Tabs>
    </div>

  )
}

export default Auth
