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
import { Edit, Edit2, Edit3, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CompaniesTable = () => {
    const navigate = useNavigate()
    const params = useParams()
    const companyId = params.id
    const { allCompanies, searchCompanyByText } = useSelector((store) => store.company);
    const [filter, setFilter] = useState(allCompanies)

    useEffect(() => {
        const filteredCompanies = allCompanies.length >= 0 && allCompanies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })        
        setFilter(filteredCompanies)
    }, [allCompanies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filter?.map((c, index) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={c.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{c.companyName}</TableCell>
                                <TableCell>{c.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-28">
                                            <div onClick={()=>navigate(`/admin/companies/${c._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                <Edit />
                                                <span>Edit</span>
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

export default CompaniesTable