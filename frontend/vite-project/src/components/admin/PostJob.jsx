import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { JOB_API_ENDPOINT } from '../../utils/constant';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {

    const { allCompanies } = useSelector(store => store.company)

    const [input, setInput] = useState({
        title: "",
        descriptions: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0,
        company: ""
    })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.companyName.toLowerCase() === value)
        setInput({ ...input, company: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_ENDPOINT}/addJob`, input, {
                headers:
                {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast({
                    title: "Job posted successfully",
                })
                navigate("/admin/jobs")
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

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-10 max-w-full border border-gray-200 shadow-lg rounder-md'>
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="descriptions"
                                value={input.descriptions}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience required</Label>
                            <Input
                                type="number"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Positions available</Label>
                            <Input
                                type="text"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Select Company</Label>
                            {
                                allCompanies.length > 0 && (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="my-1">
                                            <SelectValue placeholder="Select company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Your companies</SelectLabel>
                                                {
                                                    allCompanies.map((c, i) => {
                                                        return <SelectItem key={c._id} value={c?.companyName?.toLowerCase()}>{c.companyName}</SelectItem>
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                    {loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4">Post Job</Button>}
                    {
                        allCompanies.length <= 0 ? <p className='text-xs font-bold my-4 text-red-600'>*Please register a company first before posting a job</p> : <></>
                    }
                </form>

            </div>
        </div>
    )
}

export default PostJob