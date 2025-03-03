import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../redux/applicantsSlice'

const Applicants = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const jobId = params.id
  const { applicants } = useSelector(store => store.applicant)

  useEffect(() => {
    if (!jobId) return; // Prevent unnecessary API call
  
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${jobId}/applicants`, { withCredentials: true });
        console.log(res.data);
        dispatch(setApplicants(res.data.job));
      } catch (e) {
        console.log(e);
      }
    };
  
    fetchAllApplicants();
  }, [dispatch, jobId, applicants]);
  
  
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-lg my-5'>Applicants: {applicants?.application?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants