import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Advertise = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <>
            <div className='flex flex-col gap-4 shadow-lg bg-white p-2 rounded-lg text-sm'>
                <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-500'>Sponsored Ads</span>
                    <Ellipsis width={20} height={20} className='cursor-pointer text-gray-500' />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <Image src='https://images.pexels.com/photos/27902293/pexels-photo-27902293/free-photo-of-cup-of-brewed-coffee-on-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='User' width={100} height={128} className={`w-full ${size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"} object-cover rounded-md`}></Image>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className='flex items-center  justify-center gap-4 bg-slate-100 p-2 rounded-md'>
                    <span className='text-bold text-blue-500'>Random ad</span>
                </div>
                <button type='button' className='flex gap-2 items-center justify-center text-xs bg-gray-300 p-1 rounded-md text-gray-500 px-2 py-1'>Learn more</button>

            </div>
        </>
    )
}

export default Advertise