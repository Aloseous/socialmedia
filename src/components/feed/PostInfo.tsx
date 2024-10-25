"use client";


import { useState } from 'react';
import { Ellipsis } from 'lucide-react'
import { deletePost } from '@/utils/actions';

const PostInfo = ({ postId }: { postId: string }) => {

    const [open, setOpen] = useState(false)

    const deletePostwithId = deletePost.bind(null, postId)
    return (
        <div className='relative'>
            <Ellipsis width={20} height={20} className='cursor-pointer text-gray-500' onClick={() => setOpen(!open)} />
            {open && <div className='absolute top-4 right-0 w-32 bg-white p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30'>
                <span className='cursor-pointer'>view</span>
                <span className='cursor-pointer'>Re-post</span>
                <form action={deletePostwithId}>
                    <button className='text-red-600'>Delete</button>
                </form>
            </div>
            }
        </div>
    )
}

export default PostInfo