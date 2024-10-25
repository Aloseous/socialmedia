import { Suspense } from 'react'
import { User } from '@prisma/client'
import UserInfo from './UserInfo'
import UserMedia from './UserMedia'
import FriendRequest from './FriendRequest'
import Birthdays from './Birthdays'
import Advertise from '../common/Advertise'

const RightMenu = ({ user }: { user?: User }) => {
    return (
        <div className='flex flex-col gap-6'>
            {user && <>
                <Suspense fallback="Loading...">
                    <UserInfo user={user} />
                </Suspense>
                <Suspense fallback="Loading...">
                    <UserMedia user={user} />
                </Suspense>
            </>}
            <FriendRequest />
            <Birthdays />
            <Advertise size='md' />
        </div>

    )
}

export default RightMenu