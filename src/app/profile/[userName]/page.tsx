import { notFound } from 'next/navigation';
import prisma from '@/utils/connect';
import LeftMenu from '@/components/LeftMenu';
import PostFeed from '@/components/feed/PostFeed';
import Profile from '@/components/Profile';
import RightMenu from '@/components/rightMenu/RightMenu';
import { auth } from '@clerk/nextjs/server';

const ProfilePage = async ({ params }: { params: { userName: string } }) => {
    const { userId } = auth();
    if (!userId) return notFound();

    const user = await prisma.user.findFirst({
        where: {
            username: params.userName
        },
        include: {
            _count: { select: { follower: true, following: true, posts: true } },
            blockSend: {
                where: { blockerId: userId },
            },
        }
    });

    console.log(`user page -->`, user);

    if (!user || user.blockSend.length > 0) return notFound();

    return (
        <div className="flex gap-6 py-5">
            <div className="hidden xl:block w-[20%]"><LeftMenu pageType={'profile'} /></div>
            <div className="w-full lg:w-[70%] xl:w-[50%]">
                <div className="flex flex-col gap-2">
                    <Profile user={user} pageType="profile" />
                    <PostFeed userName={user?.username!} />
                </div>
            </div>
            <div className="hidden lg:block w-[30%]"><RightMenu user={user} /></div>
        </div>
    );
}

export default ProfilePage;
