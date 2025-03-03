import React, { useEffect, useState } from 'react'
import {
    Table, TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Edit, Edit2, Edit3, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSearchCompanyByText } from '../../redux/companySlice';

const AdminJobsTable = () => {
    const navigate = useNavigate()
    const params = useParams()
    const companyId = params.id
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);
    const { searchCompanyByText } = useSelector((store) => store.company);
    const [filter, setFilter] = useState(allAdminJobs)

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilter(filteredJobs)
    }, [allAdminJobs, searchJobByText])
    console.log(filter)
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>CompanyName</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filter?.map((c, index) => (
                            <tr>
                                <TableCell>{c.company.companyName}</TableCell>
                                <TableCell>{c.title}</TableCell>

                                <TableCell>{c.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/jobs/${c._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                <Edit className='w-4'/>
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${c._id}/applicants`)} className='flex items-center gap-2 cursor-pointer w-fit mt-2 pt-1 border-t-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable