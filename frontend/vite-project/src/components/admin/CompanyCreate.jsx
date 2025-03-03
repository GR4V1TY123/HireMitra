import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const dispatch = useDispatch()

    const [companyName, setCompanyName] = useState("")

    const CompanyCreate = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                }
                , withCredentials: true
            })
            if (res.data.success) {
                toast({
                    title: "Your Company is added successfully",
                })
                dispatch(setSingleCompany(res.data.company))
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (e) {
            console.log(e);
            toast({
                title: e.response.data.msg,
            })
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto '>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>
                <div>
                    <Label htmlFor="CompanyName">Company Name</Label>
                    <Input
                        type="text"
                        id="CompanyName"
                        className="my-2"
                        placeholder="eg: Google, Microsoft etc"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-2 my-10'>
                    <Button onClick={() => navigate("/admin/companies")} variant="destructive">Cancel</Button>
                    <Button onClick={CompanyCreate}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate