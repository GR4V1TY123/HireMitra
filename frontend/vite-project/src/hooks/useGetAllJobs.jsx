import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  const { searchQuery } = useSelector(store => store.jobs)

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, { withCredentials: true })

        if (res.data.success) {
          dispatch(setJobs(res.data.jobs))
        }
      } catch (e) {
        console.log(e);

      }
    }
    fetchAllJobs();
  }, [])
}

export default useGetAllJobs