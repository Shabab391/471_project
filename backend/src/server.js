import express from "express";
import dotenv from "dotenv";
import path from "path"
dotenv.config();
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";

import cors from "cors"
import searchRoutes from "./routes/searchRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";

import loginRoutes from "./routes/loginRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app= express();
const PORT=process.env.PORT ||5001;
const __dirname=path.resolve()

//middleware
if (process.env.NODE_ENV !=="production"){
    app.use(cors());}


app.use(express.json());


app.use("/api/notes", notesRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/profile", profileRoutes);


if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*", (req,res)=>{
    res.sendFile(path.join(_dirname,"../frontend","dist","index.html"))
})
}


connectDB().then(()=>{

app.listen(PORT, () =>{
    console.log("Server started on PORT:", PORT);
    });
});
