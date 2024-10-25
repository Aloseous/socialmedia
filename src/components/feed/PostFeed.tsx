import { auth } from '@clerk/nextjs/server';
import prisma from '@/utils/connect';
import Post from './Post'

const PostFeed = async ({ userName }: { userName?: string }) => {

    console.log(`PostFeed user -->`, userName);

    const { userId } = auth();
    let posts: any[] = []
    if (userName) {
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: userName
                }
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true
                    },
                },
                _count: {
                    select: {
                        comments: true
                    }
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    if (!userName && userId) {
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            }
        })

        console.log(`here -->`, userId);

        const followingIds = following.map(f => f.followingId);
        const ids = [userId, ...followingIds];
        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: ids,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log(`following -->`, following);
        console.log(`posts -->`, posts);
    }
    return (
        <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
            {posts.length > 0 && posts.map(post => <Post key={post.id} post={post} />) || "No Posts"}

        </div>
    )
}

export default PostFeed