import React from 'react'
import {Link} from "react-router"

const navbar = () => {
  return (
<nav className="bg-gray-400 text-black p-5">
  <div className="container mx-auto flex justify-between items-center">
    <div>
        <Link to={"/Homepage"} className="text-lg font-extrabold">APPLYWISE</Link>
        <div className="text-sm font-normal">Make your planning for further studies easier with us!</div>
    </div>
    <div className="flex items-baseline space-x-10" >
        <a href="#" className="hover:underline">Notifications</a>
        <a href="#" className="hover:underline">Study Plan</a>
        {/* <a href="#" className="hover:underline">Lifestyle Plan</a> */}
        <Link to={"/Place"} className="hover:underline">Lifestyle Plan</Link>
        <Link to={"/Profile"}  className="btn btn-neutral">Profile</Link>
        <Link to={"/"} className="btn btn-neutral">Logout</Link>
    </div>
  </div>
</nav>

  )
}

export default navbar