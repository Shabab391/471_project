import Search from "../models/Search.js";


export async function createData(req, res){
try {
    const { key, value } = req.body;
    console.log({ key, value },"here");

    // Build dynamic filter
    let filter = {};

    // Special handling for number fields
    if (key === "CGPA" || key === "stipend") {
      filter[key] = { $gte: Number(value) }; // e.g. GPA >= 3.5
    } else if (key === "field") {
      filter[key] = value; // matches if fieldOfStudy contains value
    }else if (key === "location") {
      filter[String(key)] = value;
    }
     else {
      filter[key] = value; // direct match for country, name, etc.
    }
    console.log(filter,"now here")
    const results = await Search.find(filter);
    console.log(results);
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });

  }
}

// export async function createData(req, res){
//     try{
//     const newSearch= new Search(req.body);
//     await newSearch.save();
//     res.status(201).json({message: "User created"});
// }
//     catch(error){
//         console.log(error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }