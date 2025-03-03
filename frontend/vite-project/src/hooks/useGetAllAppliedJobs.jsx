import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../utils/constant'
import { setAppliedJobs } from '../redux/applicantsSlice'

const useGetAllAppliedJobs = () => {
    const {appliedJobs} = useSelector(store=>store.applicant)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAppliedJobs(res.data.applications))
                }
            } catch (e) {
                console.log(e);

            }
        }
        fetchAppliedJobs()
    },[])
}

export default useGetAllAppliedJobs