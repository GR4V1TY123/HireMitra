import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import getCompanyById from '../../hooks/getCompanyById';

const CompanyDetails = () => {
    const { toast } = useToast()
    const params = useParams()
    const companyId = params.id
    getCompanyById(companyId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {singleCompany} = useSelector(store=>store.company)

    const [input, setInput] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        file: null,

    })
    const [loading, setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("companyName", input?.companyName)
        formData.append("description", input?.description)
        formData.append("website", input?.website)
        formData.append("location", input?.location)
        if (input.file) {
            formData.append("file", input?.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${companyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate("/admin/companies")
                toast({
                    title: res.data.msg,
                })
            }
        } catch (e) {
            console.log(e);
            toast({
                title: e.response.data.msg,
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            companyName: singleCompany.companyName || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold"><ArrowLeft /><span>Back</span></Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="companyName"
                                value={input.companyName}
                                onChange={changeEventHandler}
                                placeholder="eg: Google, Microsoft etc"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Company description"
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="eg: www.HireMitra.com etc"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="eg: India, England etc"
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>}
                </form>
            </div>
        </div>
    )
}

export default CompanyDetails