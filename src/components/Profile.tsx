import Image from 'next/image';
import { User } from '@prisma/client';

interface UserWithCount extends User {
    _count: {
        posts: number;
        follower: number;
        following: number;
    };
}

const Profile = ({ user, pageType }: { user?: UserWithCount, pageType?: string }) => {


    return (
        <div className="flex flex-col gap-6 shadow-lg bg-white p-2 rounded-lg text-sm">
            <div className={`${pageType !== "home" ? 'h-48' : 'h-20'} relative`}>
                <Image src={user?.cover || '/noCover.png'} alt="User" fill className="rounded-md object-cover" />
                <Image
                    src={user?.avatar || '/noAvatar.png'}
                    alt="User"
                    width={pageType !== "home" ? 128 : 48}
                    height={pageType !== "home" ? 128 : 48}
                    className={`${pageType !== "home" ? 'w-32 h-32 -bottom-16 ring-4' : 'w-12 h-12 -bottom-6 ring-1'} object-cover rounded-full absolute left-0 right-0 m-auto ring-white z-10`}
                />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="mt-10 text-2xl font-medium text-blue-500">
                    {user?.name && user?.surname ? `${user.name} ${user.surname}` : user?.username}
                </h1>
                {pageType !== "home" ? (
                    <div className="flex gap-12 items-center h-20">
                        <ProfileStat label="posts" count={user?._count.posts || 0} />
                        <ProfileStat label="followers" count={user?._count.follower || 0} />
                        <ProfileStat label="following" count={user?._count.following || 0} />
                    </div>
                ) : (
                    <>
                        <span>{user?._count.follower || 0} followers</span>
                        <button type="button" className="flex gap-2 items-center justify-center text-xs bg-blue-500 p-1 rounded-md text-white px-2 py-1">
                            My Profile
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const ProfileStat = ({ label, count }: { label: string, count: number }) => (
    <div className="text-xs flex flex-col items-center">
        <span className="font-semibold">{count}</span>
        <span>{label}</span>
    </div>
);

export default Profile;
