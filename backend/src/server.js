import express from "express";
import dotenv from "dotenv";
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

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/notes", notesRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/place", placeRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/profile", profileRoutes);

connectDB().then(()=>{

app.listen(PORT, () =>{
    console.log("Server started on PORT:", PORT);
    });
});
