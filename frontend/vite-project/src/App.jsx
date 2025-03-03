import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/shared/Navbar'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import SignIn from './components/auth/SignIn'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile';
import JobDetails from './components/JobDetails';
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanyDetails from './components/admin/CompanyDetails';
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import JobApplicants from './components/admin/Applicants'
import Applicants from './components/admin/Applicants'
import Protected from './components/admin/Protected'
import { config } from './utils/config'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/details/:id",
    element: <JobDetails />
  },

  //ADMIN
  {
    path:"/admin/companies",
    element: <Protected><Companies /></Protected>
  },
  {
    path:"/admin/companies/create",
    element: <Protected><CompanyCreate /></Protected>
  },
  {
    path:"/admin/companies/:id",
    element: <Protected><CompanyDetails /></Protected>
  },
  {
    path:"/admin/jobs",
    element: <Protected><AdminJobs /></Protected>
  },
  {
    path:"/admin/jobs/create",
    element: <Protected><PostJob /></Protected>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element: <Protected><Applicants /></Protected>
  },
])
console.log("Frontend is using:", config.BASE_URL);

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
