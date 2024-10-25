"use client";

import { toogleBlock, toogleFollow } from "@/utils/actions";
import { useOptimistic, useState } from "react";

interface UserInteractionProps {
    userId: string;
    isUserBlocked: boolean;
    isFollowRequest: boolean;
    isFollowingRequest: boolean;
}

const UserInfoInteraction = ({
    userId,
    isUserBlocked,
    isFollowRequest,
    isFollowingRequest,
}: UserInteractionProps) => {

    const [userState, setUserState] = useState({ isUserBlocked, isFollowRequest, isFollowingRequest });

    const [optimizedState, setOptimisticState] = useOptimistic(userState, (prev, value: "follow" | "block") => value === "follow" ? {
        ...prev,
        isFollowRequest: false,
        isFollowingRequest: !prev.isFollowRequest && !prev.isFollowingRequest ? true : false
    } : { ...prev, isUserBlocked: !prev.isUserBlocked });

    const followHandler = async () => {
        setOptimisticState("follow");  // Trigger optimistic update
        try {
            await toogleFollow(userId);
            setUserState((prev) => ({
                ...prev,
                isFollowRequest: false,
                isFollowingRequest: !prev.isFollowRequest && !prev.isFollowingRequest ? true : false
            }));
        } catch (error) {
            console.error("Error in followHandler:", error);
            // Optionally, roll back the optimistic state if there's an error.
        }
    };

    const blockHandler = async () => {
        setOptimisticState("block");  // Trigger optimistic update
        try {
            await toogleBlock(userId);
            setUserState((prev) => ({
                ...prev,
                isUserBlocked: !prev.isUserBlocked
            }))
        } catch (error) {
            console.error("Error in blockHandler:", error);
            // Optionally, roll back the optimistic state if there's an error.
        }
    }

    return (
        <>
            <div className="flex gap-2 items-center justify-center">
                <button
                    type="button"
                    className="w-full text-xs bg-blue-500 p-1 rounded-md text-white px-2 py-1"
                    onClick={followHandler}
                >
                    {optimizedState.isFollowRequest
                        ? "Follow"
                        : optimizedState.isFollowingRequest
                            ? "Request Sent"
                            : "Follow"}
                </button>
            </div>
            <div className="self-end">
                <button
                    type="button"
                    className="gap-2 right-0 text-xs text-red-500 px-2 py-1"
                    onClick={blockHandler}
                >
                    {optimizedState.isUserBlocked ? "Unblock" : "Block"}
                </button>
            </div>
        </>
    );
};

export default UserInfoInteraction;
