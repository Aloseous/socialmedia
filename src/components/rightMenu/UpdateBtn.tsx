"use client"

import { useFormStatus } from "react-dom"

const UpdateBtn = () => {

    const { pending } = useFormStatus()
    return (
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed' disabled={pending}>{pending ? 'Updating...' : ' Update'}</button>

    )
}

export default UpdateBtn