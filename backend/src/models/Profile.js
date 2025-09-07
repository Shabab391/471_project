import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  sscGpa: String,
  hscGpa: String,
  university: String,
  uniGpa: String,
  message: String,
sscFile: { data: Buffer, contentType: String },
hscFile: { data: Buffer, contentType: String },
uniFile: { data: Buffer, contentType: String },
    profileImage: {
    data: Buffer,
    contentType: String,
  },
});

const Profile=mongoose.model("UserInfo", userInfoSchema);
export default Profile