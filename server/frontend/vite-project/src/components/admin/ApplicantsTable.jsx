import React, { useEffect, useState } from 'react';
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
import { ArrowUpLeftFromSquareIcon, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_API_ENDPOINT } from '../../utils/constant';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const ApplicantsTable = () => {
    const shortListingStatus = ["Accepted", "Rejected"]
    const navigate = useNavigate()
    const { applicants } = useSelector(store => store.applicant)
    const { toast } = useToast()


    const statusHandler = async (a, status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast({
                    className: status === 'Accepted' ? "bg-green-100" : "bg-red-100",
                    title: <span>{a.applicant.fullName} has been <span className={status === 'Accepted' ? "text-green-600 font-bold" : "text-red-600 font-bold"}> {status}</span></span>,
                })
            }
        } catch (e) {
            console.log(e)
            toast({
                title: e.response.data.msg,
            })
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of applicants for xxx
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.application?.map((a, i) => {
                            return <tr className={a.status === "pending" ? "bg-gray-300" : a.status === "rejected" ? "bg-red-300" : "bg-green-300"} key={a._id} >
                                <TableCell>{a.applicant.fullName}</TableCell>
                                <TableCell>{a.applicant.email}</TableCell>
                                <TableCell>{a.applicant.phoneNumber}</TableCell>
                                <TableCell className="w-fit cursor-pointer text-blue-600 underline">
                                    {a?.applicant?.profile?.resume ? (
                                        <a
                                            href={a.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1"
                                        >
                                            <ArrowUpLeftFromSquareIcon className="w-4 h-4" />
                                            <span>{a.applicant.profile.resumeName || "Resume"}</span>
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No Resume Available</span>
                                    )}
                                </TableCell>
                                <TableCell>{a.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortListingStatus.map((status, i) => {
                                                    return (
                                                        <div className='cursor-pointer' onClick={() => statusHandler(a, status, a._id)} key={i}>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        })
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable