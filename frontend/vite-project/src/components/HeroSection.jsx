import React, { useState } from 'react'
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../redux/jobSlice';

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispacth = useDispatch()
    const navigate = useNavigate()
    
    const searchJobHandler = ()=>{
        dispacth(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-4 rounded-full bg-gray-100 text-red-600 font-bold'>All your jobs at one place</span>
                <h1 className='text-5xl font-bold'>Search, Apply & Get your <br /> <span className='text-red-600'>Dream Job</span></h1>
                <p className='my-5'>Find all your career opportunities in one place! Search for jobs, apply easily, and take a step closer to landing your dream role.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full gap-4 mx-auto'>
                    <input
                        type="text"
                        name='query'
                        placeholder='Find a job'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full' />
                    <Button onClick={searchJobHandler} className="rounded-r-full ">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection