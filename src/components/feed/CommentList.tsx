"use client";

import { useOptimistic, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Emoji from "../common/Emoji";
import { Comment, User } from "@prisma/client";
import { Ellipsis, Heart } from "lucide-react";
import { addComment } from "@/utils/actions";

type CommentListProps = Comment & {
    user: User
}

const CommentList = ({ comments, postId }: { comments: CommentListProps[], postId: string }) => {

    const [openEmoji, setOpenEmoji] = useState(false);
    const [comment, setComment] = useState(comments);
    const [desc, setDesc] = useState('');

    const { user } = useUser();

    const [optimisticComment, setOptimisticComment] = useOptimistic(comment, (state, value: CommentListProps) => [value, ...state])


    const addOrUpdateComments = async () => {
        console.log(`addOrUpdateComments -->`);
        if (!user || !desc) return
        setOptimisticComment({
            id: Math.random().toString(),
            desc,
            postId,
            userId: user?.id,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            user: {
                id: user?.id || '',
                email: user?.emailAddresses[0]?.emailAddress || '',
                username: 'adding comment...',
                avatar: user?.imageUrl || '/noAvatar.png',
                name: '',
                surname: '',
                city: '',
                work: '',
                school: '',
                website: '',
                desc: '',
                cover: '',
                createdAt: new Date(Date.now()),

            }
        })
        try {
            const comments = await addComment(postId, desc);
            setComment([comments, ...comment])
        } catch (error) {

        }

    }

    return (
        <>
            {user && <div className='flex items-center gap-4'>
                <Image src={user?.imageUrl || '/noAvatar.png'} alt='post' width={32} height={32} className='w-8 h-8 object-cover rounded-full' />
                <form action={addOrUpdateComments} className='flex items-center justify-between bg-slate-100 px-4 py-2 rounded-xl text-sm w-full'>
                    <input type='text' placeholder='Add a comment' className='bg-transparent outline-none' onChange={e => setDesc(e.target.value)} />
                    <button onClick={() => setOpenEmoji(!openEmoji)}>😊</button>
                    {openEmoji && <Emoji />}
                </form>
            </div>}
            {optimisticComment.map((comment) =>
                <div className='flex gap-4 justify-between mt-6' key={comment.id}>
                    <Image src={comment.user?.avatar || '/noAvatar.png'} alt='User' width={48} height={48} className='w-12 h-12 object-cover rounded-full'></Image>
                    <div className='flex flex-col gap-2  flex-1'>
                        <span className='font-medium'>{comment.user.name && comment.user.surname ? `${comment.user.name} ${comment.user.surname}` : comment.user.username}</span>
                        <p>{comment.desc}</p>
                        <div className='flex items-center gap-8 text-sm'>
                            <div className='flex items-center gap-2 '>

                                <Heart width={16} height={16} className='cursor-pointer' />
                                <span className='flex  gap-2'>
                                    {10}<span className='hidden md:inline'>Likes</span>
                                </span>
                            </div>
                            <span className='cursor-pointer'>Reply</span>
                        </div>
                    </div>
                    <Ellipsis width={20} height={20} />
                </div>)}
        </>
    )
}

export default CommentList