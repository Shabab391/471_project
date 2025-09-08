import React from 'react'
import Navbar from "./components/navbar"
import {Search} from "lucide-react"
import {Link} from "react-router"
const Homepage = () => {
  return (
<div>
      <Navbar/>
      <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Welcome to your all purpose Hub of answers, you can click down here to find instittions according to your needs. Study Plan is there to tell all about the surroundings of that area. Give it a try
      </p>
      <Link to={"/Search"} className="btn btn-neutral mt-2">
      <Search className="size-5"/>Search</Link>
    </div>
  </div>
</div>
</div> 

  )
}

export default Homepage