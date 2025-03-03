import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion"


const Jobs = () => {
  const { allJobs, searchQuery } = useSelector(store => store.jobs)
  const [filteredJobs, setFilteredJobs] = useState(allJobs)
  const dispatch = useDispatch()
  useEffect(() => {
    if (searchQuery) {
      const filtJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.descriptions.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.jobType.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilteredJobs(filtJobs)
      console.log(filtJobs);

    }
    else {
      setFilteredJobs(allJobs)
    }
  }, [allJobs, searchQuery])


  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>
          {
            filteredJobs.length <= 0 ? <span>Jobs not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2'>
                  {
                    filteredJobs.map((job) => {
                      return <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}>

                        <Job job={job} key={job._id} />
                      </motion.div>
                    })
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs