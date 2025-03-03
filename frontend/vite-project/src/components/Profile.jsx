import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import AppliedJobsTable from './AppliedJobsTable';
import UpdateForm from './UpdateForm';
import { useSelector } from 'react-redux';
import useGetAllAppliedJobs from '../hooks/useGetAllAppliedJobs';

const Profile = () => {
    useGetAllAppliedJobs()
    const [open, setOpen] = useState(false)
    const isResume = true
    const { user } = useSelector(store => store.auth)

    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePic} alt="profilepic" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl '>{user?.fullName || "NA"}</h1>
                            <p>{user?.profile?.bio || "NA"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email || "NA"}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber || "NA"}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-md font-bold'>Skills: </h1>
                        {
                            user?.profile?.skills.length > 0 ? user?.profile?.skills.map((item, index) => {
                                return <Badge key={index}>{item}</Badge>
                            }) : <span>No Skills</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 '>
                    <Label className="text-md font-bold">Resume: </Label>
                    {
                        isResume ? <a className='text-blue-600 w-full hover:underline cursor-pointer' target='blank' href={user?.profile?.resume}>{user?.profile.resumeName || "NA"}</a> : <span>Not available</span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-12'>
                <h1 className='text-lg font-bold'>Applied Jobs</h1>
                {/* Application table */}
                <AppliedJobsTable />
            </div>
            <UpdateForm open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile