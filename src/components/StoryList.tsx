"use client";

import { useOptimistic, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { Camera, PlusCircle } from "lucide-react";
import { addStory } from "@/utils/actions";
import CustomBtn from "./CustomBtn";

// interface StoryListProps {
//     stories: Story,
//     user: User,
// }

type StoryWithUser = Story & {
    user: User
}

const StoryList = ({ stories, userId }: { stories: StoryWithUser[], userId: string }) => {

    const [storyList, setStoryList] = useState(stories)
    const [img, setImg] = useState('');

    const { user, isLoaded } = useUser()
    const [optimisticStoryList, setOptimisticStoryList] = useOptimistic(storyList, (prevState, value: StoryWithUser) => [value, ...prevState])

    const createStory = async () => {
        if (!img) return;
        setOptimisticStoryList({
            id: Math.random().toString(),
            img,
            userId: userId,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            user: {
                id: userId || '',
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
            const createdStory = await addStory(img)
            setStoryList((prev) => {
                return [createdStory, ...prev]
            })
            setImg('');
        } catch (error) {
            console.error("Error in createStory:", error);
        }
    }


    return (
        <>
            <CldUploadWidget uploadPreset="socialmedia" onSuccess={(result: any, { widget }) => { setImg(result?.info?.secure_url); widget.close() }}>
                {({ open }) => {
                    return (
                        <div className='flex flex-col gap-2 items-center cursor-pointer relative'>
                            <Image src={img || user?.imageUrl || '/noAvatar.png'} alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' onClick={() => open()} />
                            {img ? <form action={createStory}>
                                {/* <button type='submit'>Add</button> */}
                                <CustomBtn status='adding...' buttonName='Add' className='flex items-center self-end h-6' />
                            </form> : <span className='font-medium'>Add a story</span>}
                            <PlusCircle className='w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full' />
                        </div>
                    );
                }}
            </CldUploadWidget>
            {
                optimisticStoryList.map((story) => (<div className='flex flex-col gap-2 items-center cursor-pointer' key={story.id}>
                    <Image src={story.user.avatar || '/noAvatar.png'} alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2' />
                    <span className='font-medium'>{story.user.name || story.user.username}</span>
                </div>))
            }
        </>
    )
}

export default StoryList