import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '../redux/jobSlice';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs))
        }
      } catch (e) {
        console.log(e);

      }
    }
    fetchAdminJobs();
  }, [])
}

export default useGetAllAdminJobs