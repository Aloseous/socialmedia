'use server';

import { auth } from "@clerk/nextjs/server";
import prisma from "./connect";
import { z } from "zod";
import { revalidatePath } from "next/cache";


export const toogleFollow = async (userId: string) => {
    const { userId: currentUserId } = auth();

    try {
        if (currentUserId) {
            const followRes = await prisma.follower.findFirst({
                where: {
                    followerId: currentUserId,
                    followingId: userId
                }
            })
            if (followRes) {
                await prisma.follower.delete({
                    where: {
                        id: followRes.id
                    }
                })
            } else {

                const isFollowRequestSend = await prisma.followRequest.findFirst({
                    where: {
                        senderId: currentUserId,
                        receivedId: userId
                    }
                })

                if (isFollowRequestSend) {
                    await prisma.followRequest.delete({
                        where: {
                            id: isFollowRequestSend.id
                        }
                    })
                } else {
                    await prisma.followRequest.create({
                        data: {
                            senderId: currentUserId,
                            receivedId: userId
                        }
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
    }

}

export const toogleBlock = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) throw new Error('You are not logged in!');

    try {
        if (currentUserId) {
            const blockRes = await prisma.block.findFirst({
                where: {
                    blockerId: currentUserId,
                    blockedId: userId
                }
            })
            if (blockRes) {
                await prisma.block.delete({
                    where: {
                        id: blockRes.id
                    }
                })
            } else {
                await prisma.block.create({
                    data: {
                        blockerId: currentUserId,
                        blockedId: userId
                    }
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const acceptFollowRequest = async (userId: string) => {
    console.log(` acceptFollowRequest userId -->`, ' --', userId);
    const { userId: currentUserId } = auth();

    console.log(` acceptFollowRequest currentUserId -->`, currentUserId, ' --', userId);

    if (!currentUserId) throw new Error('You are not logged in!');

    try {
        if (currentUserId) {
            const followRes = await prisma.followRequest.findFirst({
                where: {
                    senderId: userId,
                    receivedId: currentUserId
                }
            })

            console.log(`followRes 1-->`, followRes);
            if (followRes) {
                await prisma.followRequest.delete({
                    where: {
                        id: followRes.id
                    }
                })

                await prisma.follower.create({
                    data: {
                        followerId: userId,
                        followingId: currentUserId
                    }
                })
            }
        }
    } catch (error) {
        console.log("Error in acceptFollowRequest: -->", error)
    }
}

export const rejectFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) throw new Error('You are not logged in!');

    try {
        if (currentUserId) {
            const followRes = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receivedId: userId
                }
            })
            console.log(`followRes -->`, followRes);

            if (followRes) {
                await prisma.followRequest.delete({
                    where: {
                        id: followRes.id
                    }
                })
            }
        }
    } catch (error) {
        console.log("Error in acceptFollowRequest: -->", error)
    }
}

export const updateProfile = async (prevState: { success: boolean, error: boolean }, payload: { formData: FormData, cover: string }) => {

    const { formData, cover } = payload;
    const fields = Object.fromEntries(formData.entries());

    const filterdFields = Object.fromEntries(Object.entries(fields).filter(([_, value]) => value !== ''))

    const profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(30).optional(),
        surname: z.string().max(30).optional(),
        desc: z.string().max(150).optional(),
        city: z.string().max(30).optional(),
        school: z.string().max(30).optional(),
        work: z.string().max(30).optional(),
        website: z.string().max(30).optional(),

    })

    const validation = profile.safeParse({ ...filterdFields, ...(cover && { cover }) });

    console.log(`validation -->`, validation);

    if (!validation.success) {
        console.log(`validation.error -->`, validation.error.flatten().fieldErrors);
        return { success: false, error: true };
    }

    const { userId } = auth();

    if (!userId) return { success: false, error: true };


    // const { cover, name, surname, desc, city, school, work, website } = validation.data;
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: validation.data

        })
        return { success: true, error: false };
    } catch (error) {
        console.log(`error -->`, error);
        return { success: false, error: true };
    }
}

export const toogleLike = async (postId: string) => {

    const { userId } = auth();

    if (!userId) throw new Error('You are not logged in!');

    try {
        const likeRes = await prisma.like.findFirst({
            where: {
                postId,
                userId
            }
        })
        if (likeRes) {
            await prisma.like.delete({
                where: {
                    id: likeRes.id
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    postId,
                    userId
                }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong!');
    }
}

export const addComment = async (postId: string, desc: string) => {
    const { userId } = auth();
    if (!userId) throw new Error('You are not logged in!');
    try {
        const comment = await prisma.comment.create({
            data: {
                postId,
                userId,
                desc
            },
            include: {
                user: true
            }
        })
        return comment;
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong!');
    }
}

export const addPost = async (formData: FormData, img: string) => {

    const desc = formData.get('desc') as string;

    const descRequirement = z.string().min(1).max(150);
    const validation = descRequirement.safeParse(desc);
    if (!validation.success) {
        console.log(`validation.error -->`, validation.error.flatten().fieldErrors);
        return;
    }
    const { userId } = auth();
    if (!userId) throw new Error('You are not logged in!');
    try {
        await prisma.post.create({
            data: {
                userId,
                desc: validation.data,
                img
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong!');

    }
}

export const deletePost = async (postId: string) => {
    const { userId } = auth();
    if (!userId) throw new Error('You are not logged in!');
    try {
        await prisma.post.delete({
            where: {
                id: postId
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong!');
    }
}

export const addStory = async (img: string) => {


    const { userId } = auth();
    if (!userId) throw new Error('You are not logged in!');
    try {

        const existingStory = await prisma.story.findFirst({
            where: {
                userId
            }
        })

        if (existingStory) {
            await prisma.story.delete({
                where: {
                    id: existingStory.id
                }
            })
        }

        const story = await prisma.story.create({
            data: {
                userId,
                img,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            include: {
                user: true
            }
        })
        return story;
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong!');

    }
}

