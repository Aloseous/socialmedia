import prisma from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import FriendRequestList from "./FriendRequestList";

const FriendRequest = async () => {
    const { userId } = auth();

    if (!userId) throw new Error("You are not logged in!");

    console.log(`here -->`, userId);

    const request = await prisma.followRequest.findMany({
        where: {
            receivedId: userId,
        },
        include: {
            sender: true,
        },
    });

    console.log(`request -->`, request);
    if (request.length === 0) return null;
    return (
        <>
            <div className="flex flex-col gap-4 shadow-lg bg-white p-2 rounded-lg text-sm">
                <div className="flex items-center justify-between font-medium">
                    <span className="text-gray-500">Friend Request</span>
                    <Link href={"/friends"} className="text-blue-500 text-xs">
                        See All
                    </Link>
                </div>
                <FriendRequestList request={request} />
            </div>
        </>
    );
};

export default FriendRequest;
