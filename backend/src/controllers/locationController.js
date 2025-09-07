// controllers/locationController.js
import axios from "axios";


export const getCoordinates = async (req, res) => {
  try {
    const GEO_API_KEY = process.env.GEOAPIFY_API_KEY;

    const { location } = req.query;

    if (!location) return res.status(400).json({ error: "Location is required" });

    const geoRes = await axios.get("https://api.geoapify.com/v1/geocode/search", {
      params: { text: location, apiKey: GEO_API_KEY }
    });

    if (geoRes.data.features.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    const feature = geoRes.data.features[0];
    const lat = feature.properties.lat;
    const lon = feature.properties.lon;

    res.json({ location, lat, lon });
    // console.log({ location, lat, lon })
  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
