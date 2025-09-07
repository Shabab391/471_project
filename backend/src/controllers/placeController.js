import axios from "axios";



// 🔹 Get nearby places by category and coordinates
export const getPlaces = async (req, res) => {
  try {
    const GEO_API_KEY = process.env.GEOAPIFY_API_KEY;
    const { lat, lon, category = "catering.restaurant", radius = 1000 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon are required" });
    }

    const url = "https://api.geoapify.com/v2/places"
    const response = await axios.get(url, {
      params: {
        categories: category,
        filter: `circle:${lon},${lat},${radius}`, // circle:lon,lat,radius
        bias: `proximity:${lon},${lat}`,
        limit: 20,
        apiKey: GEO_API_KEY
      },
    });

    res.json(response.data.features);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
