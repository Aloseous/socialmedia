import Link from 'next/link'
import Advertise from './common/Advertise'
import Profile from './Profile'
import { Album, CalendarDays, DiamondPercent, List, Newspaper, SquareActivity, SquarePen } from 'lucide-react'

const LeftMenu = ({ pageType }: { pageType?: string }) => {
    return (
        <div className='flex flex-col gap-6'>
            {pageType === "home" && <Profile pageType={"home"} />}
            <div className='flex flex-col gap-4 shadow-lg bg-white p-2 rounded-lg text-sm text-gray-500'>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><SquarePen />My Posts</Link>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><SquareActivity />Activity</Link>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><DiamondPercent />Market Place</Link>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><CalendarDays />Events</Link>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><Album />Albums</Link>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><Newspaper />News</Link>
                <Link href='/' className='flex items-center gap-2 p-1 rounded-md hover:bg-slate-100'><List />Lists</Link>
            </div>
            <Advertise size='sm' />
        </div>
    )
}

export default LeftMenu