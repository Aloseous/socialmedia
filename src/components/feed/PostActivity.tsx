"use client";
import { useOptimistic, useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { Heart, MessageSquare, Repeat2 } from 'lucide-react'
import { toogleLike } from '@/utils/actions';

type PostActivityProps = {
    postId: string,
    likes: string[],
    commentsNo: number
}

const PostActivity = ({ postId, likes, commentsNo }: PostActivityProps) => {

    const { isLoaded, userId } = useAuth()
    const [likesNo, setLikesNo] = useState({
        likesCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false
    })

    const [optimsitickLike, setOptimsitickLike] = useOptimistic(likesNo, (state, value) => {

        return {
            likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
            isLiked: !state.isLiked
        }
    })

    const likesAction = async () => {
        try {
            toogleLike(postId)
            setLikesNo(state => ({
                likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
                isLiked: !state.isLiked
            }))
        } catch (error) {
            console.error("Error in likesAction:", error);
        }
    }
    return (
        <div className='flex items-center justify-between my-2'>
            <div className='flex items-center gap-2'>
                <form action={likesAction}>
                    <button className='flex items-center gap-2'>
                        <Heart width={16} height={16} className={optimsitickLike.isLiked ? 'text-red-600 fill-red-500' : ''} />
                        <span className='flex text-sm gap-2'>  {optimsitickLike.likesCount}<span className='hidden md:inline'>Likes</span></span>
                    </button>
                </form>
            </div>
            <div className='flex items-center gap-2'>
                <MessageSquare width={16} height={16} />
                <span className='flex text-sm gap-2'>  {commentsNo}<span className='hidden md:inline'>Comments</span></span>
            </div>
            <div className='flex items-center gap-2'>
                <Repeat2 width={16} height={16} />
                <span className='flex text-sm gap-2'> <span className='hidden md:inline'>Share</span></span>
            </div>

        </div>
    )
}

export default PostActivity