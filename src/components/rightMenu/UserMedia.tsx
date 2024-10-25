import Image from 'next/image'
import Link from 'next/link'
import { User } from '@prisma/client'
import prisma from '@/utils/connect'

const UserMedia = async ({ user }: { user?: User }) => {

    const postWithMedia = await prisma.post.findMany({
        where: {
            userId: user?.id,
            img: {
                not: null,
            },
        },
        take: 8,
        orderBy: {
            createdAt: 'desc'
        }
    })
    return (
        <div>
            <div className='flex flex-col gap-4 shadow-lg bg-white p-2 rounded-lg text-sm'>
                <div className='flex items-center justify-between font-medium'>
                    <span className='text-gray-500'>User media</span>
                    <Link href={'/friends'} className='text-blue-500 text-xs'>See All</Link>
                </div>
                <div className='flex justify-between flex-wrap gap-4'>
                    {postWithMedia.length > 0 ? postWithMedia.map((post) => <div className='relative w-1/5 h-24' key={post.id}>
                        <Image src={post.img!} alt='User' fill className='object-cover rounded-md'></Image>
                    </div>) : "No media"}
                </div>
            </div>
        </div>
    )
}

export default UserMedia