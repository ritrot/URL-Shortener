import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UrlState } from '../Contextapi'
import useFetch from '../hooks/UseFetch'
import { signout } from '../db/apiAuth'
import Loading from './Loading'
const Header = () => {
    const naviagte = useNavigate()
    const { user, fetchUser } = UrlState();
    const { loading, fn: logout } = useFetch(signout);
    return (<>
        <nav className='flex  items-center justify-between p-4 '>
            <Link to="/">
                <img src="./vite.svg" alt="logo" />
            </Link>
            <div>
                {!user ? <Button onClick={() => naviagte("/auth")}>LogIn</Button>
                    : <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-10 rounded-full">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    {user?.email}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={"/dashboard"}>
                                    My Links
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem >
                                <span onClick={() => {
                                    logout().then(() => {
                                        fetchUser();
                                        naviagte("/")
                                    })
                                }}>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </nav>
        {/* {loading && <Loading />} */}
    </>
    )
}

export default Header
