import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import { setSearchQuery } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispacth = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispacth(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-5">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div>
                                    <Button onClick={()=>searchJobHandler(cat)} key={index} className="rounded-full bg-red-600">{cat}</Button>
                                </div>

                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel