import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { Bell, CircleFadingPlus, House, Loader, LogIn, MessageCircle, Search, Users } from 'lucide-react'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const NavBar = () => {
    return (
        <div className='h-24 flex items-center justify-between'>
            <div className='font-bold text-xl text-red-600 md:hidden lg:block w-[20%]'>Kingz</div>
            <div className='hidden md:flex gap-4 text-gray-600 w-[50%] items-center justify-between'>
                <Link href='/' className='flex items-center gap-2'>
                    <House width={20} height={20} />
                    Home</Link>
                <Link href='/' className='flex items-center gap-2'>
                    <Users width={20} height={20} />
                    Friends</Link>
                <Link href='/' className='flex items-center gap-2'>
                    <CircleFadingPlus width={20} height={20} />
                    Stories</Link>
                <div className="flex items-center bg-slate-100 p-2 rounded-md">
                    <input type="text" className=' bg-transparent outline-none' placeholder='Search...' />
                    <Search width={20} height={20} />
                </div>
            </div>
            <div className='w-[30%] flex items-center justify-end gap-4 xl:gap-8'>
                <ClerkLoading>
                    <Loader width={20} height={20} />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <Users className='cursor-pointer' width={20} height={20} />
                        <MessageCircle className='cursor-pointer' width={20} height={20} />
                        <Bell className='cursor-pointer' width={20} height={20} />
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <LogIn width={20} height={20} />
                        <Link href='/sign-in'>Login/Register</Link>
                    </SignedOut>
                </ClerkLoaded>
                <Menu />
            </div>
        </div >
    )
}

export default NavBar