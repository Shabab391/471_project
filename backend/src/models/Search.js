import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({}, { strict: false });
const Search= mongoose.model("Search", searchSchema);
export default Search

