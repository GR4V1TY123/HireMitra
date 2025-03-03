import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Chennai", "Delhi", "Jaipur"]
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "AIML", "Fullstack"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]



const FilterCard = () => {
  const dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = useState("")
  const RadioChange = (value) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue])


  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup onValueChange={RadioChange} value={selectedValue}>
        {
          filterData.map((data, index) => {
            return <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((arr, ind) => {
                  const radio_id = `id${index}-${ind}`
                  return <div className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={arr} id={radio_id} />
                    <Label className="hover:cursor-pointer" htmlFor={radio_id}>{arr}</Label>
                  </div>
                })
              }
            </div>
          })
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard