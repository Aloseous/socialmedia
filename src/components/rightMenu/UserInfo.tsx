import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import {
    BriefcaseBusiness,
    GraduationCap,
    MapPin,
    Link as Link2,
    CalendarDays,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import UserInfoInteraction from "./UserInfoInteraction";
import UpdateUser from "./UpdateUser";

const UserInfo = async ({ user }: { user: User }) => {
    console.log(`UserInfo -->`, user);

    const createdAt = new Date(user?.createdAt || Date.now());

    const formattedDate = createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let isUserBlocked = false;
    let isFollowRequest = false;
    let isFollowingRequest = false;

    const { userId: currentUserId } = auth();

    if (currentUserId) {
        const blockRes = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: user.id,
            },
        });
        blockRes && (isUserBlocked = true);

        const followRes = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: user.id,
            },
        });
        followRes && (isFollowRequest = true);

        const followReqRes = await prisma.followRequest.findFirst({
            where: {
                senderId: currentUserId,
                receivedId: user.id,
            },
        });
        followReqRes && (isFollowingRequest = true);
    }

    console.log(`currentUserId -->`, currentUserId, ' --', user.id);

    return (
        <div className="flex flex-col gap-4 shadow-lg bg-white text-gray-500 p-3 rounded-lg text-sm">
            <div className="flex items-center justify-between font-medium">
                <span className="">User Information</span>
                {currentUserId === user.id ? <UpdateUser user={user} /> : <Link href={"/friends"} className="text-blue-500 text-xs">
                    See All
                </Link>}
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xl capitalize">
                    {user.name && user.surname
                        ? `${user.name} ${user.surname}`
                        : user.name}
                </span>
                <span>@{user.username}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p>{user.desc ?? "No descriptions to show."}</p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <MapPin width={16} height={16} aria-label="Location" />
                    <span className="text-xs text-gray-600">Living in</span>
                    <span>
                        <b>{user.city ?? "No city mentioned."}</b>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <GraduationCap width={16} height={16} aria-label="Education" />
                    <span className="text-xs text-gray-600">Went to</span>
                    <span>
                        <b>{user.school ?? "No schools to show."}</b>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <BriefcaseBusiness width={16} height={16} aria-label="Work" />
                    <span className="text-xs text-gray-600">Worked at</span>
                    <span>
                        <b>{user.work ?? "No workplaces to show."}</b>
                    </span>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                    <div className="flex gap-2 items-center">
                        <Link2 width={16} height={16} aria-label="Website" />
                        <Link href={user.website || "#"} className="text-blue-500 text-xs">
                            {user.website ?? "No website available."}
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CalendarDays width={16} height={16} aria-label="Join Date" />
                        <span className="text-gray-600">Joined {formattedDate}</span>
                    </div>
                </div>
            </div>
            {(currentUserId && currentUserId !== user.id) && <UserInfoInteraction
                userId={user.id}
                isUserBlocked={isUserBlocked}
                isFollowRequest={isFollowRequest}
                isFollowingRequest={isFollowingRequest}
            />}
        </div>
    );
};

export default UserInfo;
