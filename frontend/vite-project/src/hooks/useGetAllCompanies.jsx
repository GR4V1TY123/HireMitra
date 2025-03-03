import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllCompanies } from '../redux/companySlice';
import { COMPANY_API_ENDPOINT } from '../utils/constant';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchAllCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
