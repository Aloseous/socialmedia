"use client";

import { useOptimistic, useState } from 'react';
import Image from 'next/image'
import { FollowRequest, User } from '@prisma/client';
import { CircleCheck, CircleX } from 'lucide-react'
import { acceptFollowRequest, rejectFollowRequest } from '@/utils/actions';

type RequestWithUser = FollowRequest & { sender: User }

const FriendRequestList = ({ request }: { request: RequestWithUser[] }) => {


    const [requestState, setRequestState] = useState(request);

    const acceptHandler = async (requestId: string, userId: string) => {
        // "6713b7b987f4c131b85975a3"
        setOptimisticState(requestId);
        try {
            await acceptFollowRequest(userId);
            setRequestState((prev) => prev.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error("Error in acceptHandler:", error);
        }
    }
    const rejectHandler = async (requestId: string, userId: string) => {
        setOptimisticState(requestId);
        try {
            await rejectFollowRequest(userId);
            setRequestState((prev) => prev.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error("Error in acceptHandler:", error);
        }
    }

    const [optimizedState, setOptimisticState] = useOptimistic(requestState, (state, value) => state.filter((request) => request.id !== value))

    return (
        <>
            {optimizedState.length > 0 && request.map((request) => <div className='flex items-center justify-between' key={request.id}>
                <div className='flex items-center gap-2'>
                    <Image src={request.sender?.avatar || "/noAvatar.png"} alt='User' width={48} height={48} className='w-12 h-12 object-cover rounded-full'></Image>
                    <span className='font-medium'>{request.sender?.name && request.sender.surname ? `${request.sender.name} ${request.sender.surname}` : request.sender?.username}</span>
                </div>
                <div className='flex gap-2'>
                    <CircleCheck className='cursor-pointer text-blue-500' onClick={() => acceptHandler(request.id, request.senderId)} />
                    <CircleX className='cursor-pointer' onClick={() => rejectHandler(request.id, request.senderId)} />
                </div>
            </div>)}
        </>
    )
}

export default FriendRequestList