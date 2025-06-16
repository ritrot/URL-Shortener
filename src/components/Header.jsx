import React from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Header = () => {
    const naviagte = useNavigate()
    let active = false;
    return (
        <nav className='flex  items-center justify-between p-4 '>
            <Link to="/">
                <img src="./vite.svg" alt="logo" />
            </Link>
            <div>
                {active ? <Button onClick={() => naviagte("/auth")}>LogIn</Button>
                    : <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className = "w-10 rounded-full">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>My Links</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </nav>
    )
}

export default Header
