import mongoose from "mongoose";
import csvtojson from "csvtojson";
import kagglehub

path = kagglehub.dataset_download("timmofeyy/-universities-schoolarships-all-around-the-world")

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://shabab:mern@cluster0.3ixdpvy.mongodb.net/scholarships?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Flexible schema
const scholarshipSchema = new mongoose.Schema({}, { strict: false });
const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

// Path to your CSV
const csvFilePath = "scholarships.csv";

// Convert CSV to JSON and insert into MongoDB
csvtojson()
  .fromFile(csvFilePath)
  .then(async (jsonData) => {
    await Scholarship.insertMany(jsonData);
    console.log("CSV data uploaded to MongoDB!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));