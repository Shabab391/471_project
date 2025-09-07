import React from 'react'
import Navbar from "./components/navbar"

import api from "../lib/axios"
import { useState } from "react";

const Search = () => {
  const [key, setKey] = useState("location");
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.post("/search", { key, value });
      setResults(res.data); 
      console.log(setResults)
      console.log("reached")
    } catch (err) {
      console.log("bloody");
      console.error(err);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <select
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border p-2"
        >
          <option value="location">Country</option>
          <option value="CGPA">Minimum GPA</option>
          <option value="field">Field of Study</option>
        </select>
        <input
          placeholder="Enter value..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleSearch} className=" btn bg-neutral text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Display results */}
      <div>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul className="space-y-2">
            {results.map((scholarship) => (
              <li
                key={scholarship._id}
                className="border p-3 rounded shadow-sm"
              >
                <h2 className="font-bold">{scholarship.name}</h2>
                <p>Field of Study: {scholarship.field?.join(", ")}</p>
                <p>Min GPA: {scholarship.CGPA}</p>
                <p>Stipend: {scholarship.stipend}</p>
                <p>Country: {scholarship.location}</p>
                <p>Deadline: {scholarship.deadline}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
 </div>
  )
}

export default Search