import { useState } from "react";

import api from "../lib/axios"
const Location = () => {
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get("/location", {
        params: { location },
      });
      setPlaces(res.data.places || []); // fallback if no places returned
    } catch (err) {
      console.error("Error fetching places:", err);
    }
  };

  return (
    <div>
      <h1>Global Restaurant Finder</h1>
      <input
        type="text"
        placeholder="Enter city or address"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>

      <ul>
        {places.map((place) => (
          <li key={place.properties.place_id}>
            <strong>{place.properties.name}</strong> –{" "}
            {place.properties.address_line1 || "No address"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Location;
