"use client";

import { useState } from 'react'
import Image from 'next/image'
import Emoji from './common/Emoji'
import { Calendar, Camera, Video, Vote } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { useUser } from '@clerk/nextjs';
import { CldUploadWidget } from 'next-cloudinary';
import CustomBtn from './CustomBtn';
import { addPost } from '@/utils/actions';

const CreatePost = () => {

  const { user, isLoaded } = useUser();

  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')

  if (!isLoaded) return <div>Loading</div>




  return (
    <div className='p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm'>
      <Image src={user?.imageUrl || '/noAvatar.png'} alt='User' width={48} height={48} className='w-12 h-12 object-cover rounded-full'></Image>
      <div className='flex-1'>
        <form action={(formData) => addPost(formData, img || "")} className='flex gap-4'>
          <textarea className='w-full text-sm bg-slate-100 p-2 rounded-lg outline-none' placeholder='What are you thinking?' name='desc' onChange={(e) => setDesc(e.target.value)}></textarea>
          <button >😊</button>
          {/* <button onClick={() => setOpenEmoji(!openEmoji)}>😊</button> */}
          {/* {openEmoji && <Emoji />} */}
          {/* <button>Post</button> */}
          <CustomBtn status='Posting...' buttonName='Post' className='flex items-center self-end h-6' />

        </form>
        <div className='flex items-center gap-4 mt-4 text-gray-400 flex-wrap'>
          <CldUploadWidget uploadPreset="socialmedia" onSuccess={(result: any, { widget }) => { setImg(result?.info?.secure_url); widget.close() }}>
            {({ open }) => {
              return (
                <div className='flex items-center gap-1 cursor-pointer' onClick={() => open()}>
                  <Camera width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className=' flex items-center gap-1'>
            <Video width={20} height={20} />
            Video
          </div>
          <div className=' flex items-center gap-1'>
            <Calendar width={20} height={20} />
            Event
          </div>
          <div className=' flex items-center gap-1'>
            <Vote width={20} height={20} />
            Poll
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePost