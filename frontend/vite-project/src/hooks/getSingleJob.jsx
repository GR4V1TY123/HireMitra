import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setJobs, setSingleJob } from '../redux/jobSlice';

const getSingleJob = () => {
  const dispatch = useDispatch()

  
}

export default getSingleJob