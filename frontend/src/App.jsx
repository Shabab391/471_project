import React from 'react'
import {Route,Routes} from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Location from "./pages/Location";
import Place from "./pages/Place";
import Profile from "./pages/Profile";

import toast from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Homepage" element={<Homepage/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Search" element={<Search/>}/>
          <Route path="/Location" element={<Location/>}/>
          <Route path="/Place" element={<Place/>}/>
          <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App