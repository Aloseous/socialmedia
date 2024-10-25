"use client";

import { useFormStatus } from "react-dom";

interface CustomBtnProps {
    status: string;
    buttonName: string;
    className?: string; // Optional className prop to customize styles
}

const CustomBtn = ({ status, buttonName, className }: CustomBtnProps) => {
    const { pending } = useFormStatus();
    return (
        <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={pending}
        >
            {pending ? status : buttonName}
        </button>
    );
};

export default CustomBtn;
