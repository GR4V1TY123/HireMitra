import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
    const navigate = useNavigate()
    
    const daysAgoFunction = (mongoTime)=>{
        const createdAt = new Date(mongoTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference/(1000*60*60*24))
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-gray-50 border-gray-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-md font-medium'>{job?.company?.companyName}</h1>
                    <p className='text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p>{job?.descriptions}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-900 font-bold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="text-blue-900 font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-red-600 font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/details/${job._id}`)} variant="outline">Details</Button>
                <Button className="bg-purple-800">Save for later</Button>
            </div>
        </div>
    )
}

export default Job