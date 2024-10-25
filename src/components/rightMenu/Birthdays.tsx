import Image from 'next/image'
import Link from 'next/link'
import { Gift } from 'lucide-react'

const Birthdays = () => {
    return (
        <> <div className='flex flex-col gap-4 shadow-lg bg-white p-2 rounded-lg text-sm'>
            <div className='flex items-center justify-between'>
                <span className='text-gray-500'>Birth Days</span>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <Image src='https://images.pexels.com/photos/27091195/pexels-photo-27091195/free-photo-of-woman-in-dress-standing-with-bag-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='User' width={48} height={48} className='w-12 h-12 object-cover rounded-full'></Image>
                    <span className='font-medium'>Barbara</span>
                </div>
                <button type='button' className='flex gap-2 text-xs bg-blue-500 p-1 rounded-md text-white px-2 py-1'>Celebrate</button>
            </div>

            <div className='flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-md'>
                <Gift />
                <Link href={'/friends'} className='flex flex-col gap-2'>
                    <span className='text-xs text-bold'>Upcoming birthday</span>
                    <span className='text-xs text-gray-400'>see other birthdays</span>
                </Link>
            </div>

        </div>
        </>
    )
}

export default Birthdays