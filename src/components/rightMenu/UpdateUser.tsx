"use client";

import { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary';
import { X } from 'lucide-react';
import { updateProfile } from '@/utils/actions';
import CustomBtn from '../CustomBtn';

const UpdateUser = ({ user }: { user: User }) => {

    const [open, setOpen] = useState(false)
    const [cover, setCover] = useState("");
    const [state, formAction] = useActionState(updateProfile, { success: false, error: false })

    const router = useRouter()

    const onUpload = (result: any) => {
        setCover(result.info.secure_url)
    }
    const onQueuesEnd = (result: any, { widget }: any) => {
        widget.close();
    }

    const handleClose = () => {
        setOpen(false)
        state.success && router.refresh()
    }

    return (
        <div className='flex flex-col'>
            <span className='text-blue-500 text-xs cursor-pointer' onClick={() => setOpen(true)}>Update</span>
            {open && <div className='absolute bg-black bg-opacity-65 w-screen h-screen top-0 left-0 flex items-center justify-center z-50'>
                <form action={(formData) => formAction({ formData, cover })} className='bg-white text-black p-12 rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative'>
                    Update Profile
                    <div className='mt-4 text-xs text-gray-500'>
                        To change your profile picture, go to your account settings.
                    </div>

                    <CldUploadWidget uploadPreset="socialmedia" onSuccess={onUpload} onQueuesEnd={onQueuesEnd}>
                        {({ open }) => {
                            return (
                                <div className='flex flex-col gap-4 my-4' onClick={() => open()}>
                                    <label htmlFor=""> Cover picture</label>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <Image src={user.cover ? user.cover : cover || '/noCover.png'} alt='User' width={48} height={32} className='w-12 h-8 object-cover rounded-sm' />
                                        <span className='text-xs text-blue-500'>Change</span>
                                    </div>
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                    <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>First Name</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='name' placeholder={user.name || 'First Name'} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>Surname</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='surname' placeholder={user.surname || 'surname'} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>Description</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='desc' placeholder={user.desc || 'Description'} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>City</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='city' placeholder={user.city || 'Chennai'} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>School</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='school' placeholder={user.name || 'LMS Hr.sec school'} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>Worked at</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='work' placeholder={user.work || 'Photon'} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="" className=''>Website</label>
                            <input type="text" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' name='website' placeholder={user.website || 'Kingz.com'} />
                        </div>
                    </div>
                    <CustomBtn status='Updating...' buttonName='Update' />
                    <X className='absolute text-black top-3 right-2 cursor-pointer' onClick={handleClose} />
                    {state.success && <div className='text-green-500 text-xs'>Profile updated successfully</div>}
                    {state.error && <div className='text-red-500 text-xs'>Something went wrong</div>}

                </form>
            </div>}
        </div>
    )
}

export default UpdateUser