import Image from 'next/image'
import { Post as PostType, User } from '@prisma/client'
import { Ellipsis } from 'lucide-react'
import PostActivity from './PostActivity'
import Comments from './Comments'
import { Suspense } from 'react'
import PostInfo from './PostInfo'
import { auth } from '@clerk/nextjs/server'

type PostProps = PostType & { user: User } & { likes: [{ userId: string }] } & { _count: { comments: number } }

const Post = ({ post }: { post: PostProps }) => {

    const { userId } = auth();
    return (
        <div className='flex flex-col gap-4 shadow-lg p-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Image src={post.user.avatar || '/noAvatar.png'} alt='User' width={40} height={40} className='w-10 h-10 object-cover rounded-full'></Image>
                    <span className='font-medium'>{post.user?.name && post.user?.surname ? `${post.user.name} ${post.user.surname}` : post.user?.username}</span>
                </div>
                {userId === post.user.id && <PostInfo postId={post.id} />}
            </div>
            <div className='flex flex-col gap-4'>
                {post.img && <div className='relative w-full min-h-96'>
                    <Image src={post.img} alt='post' fill className='object-cover rounded-md'></Image>
                </div>}
                <p>{post.desc}</p>
            </div>
            <Suspense fallback="Loading...">
                <PostActivity postId={post.id} likes={post.likes.map((like) => like.userId)} commentsNo={post._count.comments} />
            </Suspense>
            <Suspense fallback="Loading...">
                <Comments postId={post.id} />
            </Suspense>
        </div>
    )
}

export default Post