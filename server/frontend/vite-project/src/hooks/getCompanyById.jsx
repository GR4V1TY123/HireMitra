import React, { useEffect } from 'react'
import axios from 'axios';
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setJobs } from '../redux/jobSlice';
import { setSingleCompany } from '../redux/companySlice';

const getCompanyById = (companyId) => {
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchSingleCompany = async()=>{
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {withCredentials:true})
        if(res.data.success){
          dispatch(setSingleCompany(res.data.company))
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchSingleCompany();
  },[companyId,dispatch])
}

export default getCompanyById