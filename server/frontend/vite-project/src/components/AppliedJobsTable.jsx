
import React, { useEffect } from 'react'
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '../utils/constant';
import { useSelector } from 'react-redux';

const AppliedJobsTable = () => {
    const { appliedJobs } = useSelector(store => store.applicant)
    console.log(appliedJobs);


    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your applied jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    appliedJobs.length <= 0 ? <span>No jobs applied yet</span> : <TableBody>
                        {
                            appliedJobs.length > 0 && appliedJobs.map((item, index) => {
                                return <TableRow key={index}>
                                    <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                                    <TableCell>{item.job.title}</TableCell>
                                    <TableCell>{item.job.company.companyName}</TableCell>
                                    <TableCell className="text-right"><Badge className={item.status === "accepted" ? "bg-green-700": item.status==="rejected" ? "bg-red-700" : ""}>{item.status}</Badge></TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                }
            </Table>
        </div>
    )
}

export default AppliedJobsTable