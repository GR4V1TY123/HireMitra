import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast';
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import store from '../../redux/store'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const { toast } = useToast()
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { user, loading } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))

      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast({
          title: "Logged in successfully",
          description: `Welcome back!`
        })
      }

    } catch (e) {
      console.log(e);
      toast({
        title: "Login falied",
        description: e.response.data.msg
      })

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
          <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Log In</h1>

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
              </RadioGroup>
            </div>
            <div>
              {loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className="w-full my-4">Log In</Button>}
            </div>
            <span>Don't have an account? <Link className='text-sm text-blue-600 underline cursor-pointer' to="/signin">Sign In</Link></span>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login