import User from "../models/User.js";
export async function  getAllNotes(req, res){
    const users= await User.find()
    res.status(200).json(users);
}

export async function createNote(req, res){
    try{
    const{username, email, password}= req.body;
    const newUser = new User({username, email, password});
    await newUser.save();
    res.status(201).json({message: "User created"});
}
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

