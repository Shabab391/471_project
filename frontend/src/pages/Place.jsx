
import { useState } from "react";
import api from "../lib/axios"
import Navbar from "./components/navbar";

const categories = [
  { key: "catering.restaurant", label: "Restaurants" },
  { key: "accommodation.hotel", label: "Hotels" },
  { key: "commercial.supermarket", label: "Supermarkets" },
  { key: "tourism.attraction", label: "Tourist Attractions" },
];

const PlaceDashboard = () => {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = async () => {
    const res = await api.get("/location", {
      params: { location },
    });
    const { lat, lon } = res.data;
    return { lat, lon };
  };

  const handleSearch = async () => {
    if (!location) return;
    try {
      setLoading(true);
      const { lat, lon } = await fetchCoordinates();

      const promises = categories.map((cat) =>
        api.get("/place", {
          params: { lat, lon, category: cat.key, radius: 1000 },
        })
      );

      const responses = await Promise.all(promises);

      const newResults = {};
      categories.forEach((cat, index) => {
        newResults[cat.key] = responses[index].data;
      });

      setResults(newResults);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching places:", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-base-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-neutral mb-8">
            Area Places Dashboard
          </h1>

          {/* Input & Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <input
              type="text"
              placeholder="Enter city or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered w-full sm:flex-1"
            />
            <button
              onClick={handleSearch}
              className={`btn btn-neutral ${loading ? "loading" : ""}`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.key} className="card bg-100 shadow-xl  ">{/*border border-red-800*/}
                <div className="card-body p-4"> {/*border-orange-400*/}
                  <h2 className="card-title justify-center text-neutral ">
                    {cat.label}
                  </h2>

                  {results[cat.key]?.length > 0 ? (
                    <ul className="space-y-2 max-h-96 overflow-y-auto">
                      {results[cat.key].map((place) => (
                        <li
                          key={place.properties.place_id}
                          className="p-2 border rounded-lg hover:bg-base-200 transition"
                        >
                          <h3 className="font-semibold">
                            {place.properties.name || "Unnamed Place"}
                          </h3>
                          <p className="text-sm opacity-70">
                            {place.properties.address_line1 || "No address"}
                          </p>
                          {place.properties.categories && (
                            <div className="badge badge-outline badge-sm mt-1">
                              {place.properties.categories[0]}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm text-center mt-4">
                      No results
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDashboard;
