import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { USER_API_ENDPOINT } from '../../utils/constant'
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import store from '../../redux/store'
import { Loader2 } from 'lucide-react'



const SignIn = () => {
  const { toast } = useToast()

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  })

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const dispatch = useDispatch()
  const { user, loading } = useSelector(store => store.auth)

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullName", input.fullName)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate("/login")
        toast({
          title: "Your profile is added successfully",
          description: `Welcome ${input.fullName}!`
        })
      }

    } catch (e) {
      console.log(e);

    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(()=>{
    if(user !== null){
        navigate("/")
    }
  }, [])

  return (
    <div>
      <div>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
          <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Sign In</h1>
            <div className='my-2'>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
                placeholder="John"
              />
            </div>

            <div className='my-2'>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="john@gmail.com"
              />
            </div>

            <div className='my-2'>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="0000000000"
              />
            </div>

            <div className='my-2'>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder=""
              />
            </div>

            <div className='flex items-center justify-between'>
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    id="r1"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    id="r2"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
                <div className='flex items-center gap-2'>
                  <Label>Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                  />
                </div>
              </RadioGroup>
            </div>
            <div>
              {loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4">SignIn</Button>}
            </div>
            <span>Already have an account? <Link className='text-sm text-blue-600 underline cursor-pointer' to="/login">Login</Link></span>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SignIn