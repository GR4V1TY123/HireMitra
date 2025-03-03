import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/authSlice'
import { useToast } from '@/hooks/use-toast';
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/constant'



const Navbar = () => {
  const { toast } = useToast()
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast({
          title: "Logged out successfully"
        })
      }

    } catch (e) {
      console.log(e);
      toast({
        title: "Uh oh, An error occured",
        description: e
      })
    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Hire<span className='text-[blue]'>Mitra</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user?.role === "recruiter" ?
                <>
                  <li><Link to="/">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </> :
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li></>
            }

          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to="/signin"><Button variant="outline">Sign In</Button></Link>
                <Link to="/login"><Button className="bg-blue-600">Log In</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePic} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className='flex gap-4'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePic} />
                      <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullName}</h4>
                      <p className=' text-sm text-muted-foreground'>{user?.role}</p>
                    </div>
                  </div>
                  <div className='flex flex-col text-gray-600'>
                    {
                      user && user?.role === "student" &&
                      <div className='flex w-fit items-center gap-2'>
                        <User2 />
                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                      </div>
                    }
                    <div className='flex w-fit items-center gap-2'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>


                </PopoverContent>
              </Popover>
            )
          }





        </div>
      </div>
    </div>
  )
}

export default Navbar