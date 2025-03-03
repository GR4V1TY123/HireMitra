import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.jobs)
    console.log(allJobs);
    

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold mt-8'><span className='text-red-600'>Latest & Top</span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                
                {allJobs.length <= 0 ? <span>No jobs available</span>: allJobs.slice(0,6).map((job) => {
                    return <LatestJobCards job={job} key={job._id} />
                })}
            </div>
        </div>
    )
}

export default LatestJobs