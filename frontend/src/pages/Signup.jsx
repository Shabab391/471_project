import React from 'react'
import {useState} from "react"
import toast from "react-hot-toast"
import {Link, useNavigate} from "react-router"
import api from "../lib/axios"

const Signup = () => {
    const [username, setUsername]=useState("")
    const  [email,setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [loading, setLoading]=useState(false)
    const navigate=useNavigate()

    const handleSubmit= async (e)=>{
      e.preventDefault();

      if(!username.trim() || !email.trim()|| !password.trim()){
        toast.error("All fields required!!");
        return;
      }
      setLoading(true)
      try{
        await api.post("/notes",{
          username,
          email,
          password,
        })
        toast.success("User created")
        localStorage.setItem("userEmail", email);
        navigate("/Homepage")
      }
      catch(error){
        console.log(error)
        
        toast.error("Failed to create")


      }
      finally{setLoading(false)}

    }

  return (
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col text-center">
    {/* Text Section */}
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">
        Join us and enter a world of opportunities at your fingertips
      </p>
    </div>

    {/* Card Section */}
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="label">Username</label>
          <input type="text" className="input input-bordered w-full" placeholder="Username"
           value={username} onChange={(e)=>setUsername(e.target.value)}/>


          <label className="label">Email</label>
          <input type="email" className="input input-bordered w-full" placeholder="Email" 
          value={email} onChange={(e)=>setEmail(e.target.value)}/>

          <label className="label">Password</label>
          <input type="password" className="input input-bordered w-full" placeholder="Password"
          value={password} onChange={(e)=>setPassword(e.target.value)} />

          <div>
            <button className="btn btn-neutral mt-2" disabled={loading}>
              {loading? "Signing Up..." : "Signup"}</button>
          </div>
        </fieldset>
      </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default Signup