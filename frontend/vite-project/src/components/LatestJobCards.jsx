import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'


const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/details/${job._id}`)} className='p-5 rounded-md shadow-xl bg-gray-50 border-gray-300 cursor-pointer'>
            <div>
                <h1 className='text-lg font-semibold'>{job?.company?.companyName}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.descriptions}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-900 font-bold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="text-blue-900 font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-red-600 font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards