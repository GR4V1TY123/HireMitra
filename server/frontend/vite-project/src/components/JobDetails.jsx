import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from './shared/Navbar';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant';
import axios from 'axios';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const JobDetails = () => {
    
    const { toast } = useToast()
    const {user} = useSelector(store=>store.auth)
    const params = useParams()
    const jobId = params.id
    const {singleJob} = useSelector(store=>store.jobs)
    const dispatch = useDispatch()
    const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant === user?._id) || false
    const [isApplied,setIsApplied] = useState(isInitiallyApplied)

    const applyJobHandler = async()=>{
      try {
        const res = await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{}, {withCredentials: true})
        console.log(res.data);
        if(res.data.success){
          setIsApplied(true)
          const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
          dispatch(setSingleJob(updateSingleJob))
          toast({
            title: "Applied successfully",
            description: `Best of luck`
          })
        }
      } catch (e) {
        console.log(e);
        toast({
          title: e.response.data.msg,
        })
      }
    }

    useEffect(()=>{
        const fetchSingleJobs = async()=>{
          try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {withCredentials:true})
            console.log(res.data)
    
            if(res.data.success){
              dispatch(setSingleJob(res.data.job))
              setIsApplied(res.data.job.application.some(application=>application.applicant === user?._id))
            }

          } catch (e) {
            console.log(e);
            
          }
        }
        fetchSingleJobs();
      },[jobId,user?._id,dispatch])

    return (
        
        <div>
            <Navbar/>
            <div className='max-w-6xl mx-auto mt-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-xl font-bold '>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className="text-blue-900 font-bold" variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className="text-blue-900 font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-red-600 font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null:applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : 'bg-blue-600 cursor-pointer hover:bg-purple-800'}`}>{isApplied ? "Already applied" : "Apply Now"}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-200 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.descriptions}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Application: <span className='pl-4 font-normal text-gray-800'>{singleJob?.application.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split('T')[0]}</span></h1>
            </div>
        </div>
        </div>
    )
}

export default JobDetails