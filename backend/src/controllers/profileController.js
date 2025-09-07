import UserInfo from "../models/Profile.js";
export const getUserInfo = async (req, res) => {
  try {
    
    const { email } = req.params;
    const userInfo = await UserInfo.findOne({ email });

    if (!userInfo) return res.status(404).json({ success: false, message: "User not found" });

    // Convert profileImage buffer to base64 string
    let profileImageBase64 = null;
    if (userInfo.profileImage?.data) {
      profileImageBase64 = `data:${userInfo.profileImage.contentType};base64,${userInfo.profileImage.data.toString(
        "base64"
      )}`;
    }

    res.json({ success: true, userInfo: { ...userInfo.toObject(), profileImage: profileImageBase64 } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateInfo = async (req, res) => {
  try {
    const { sscGpa, hscGpa, university, uniGpa, message, email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    let userInfo = await UserInfo.findOne({ email });

    // Helper function to convert multer file to object with buffer + mimetype
    const fileToBuffer = (file) => file ? { data: file.buffer, contentType: file.mimetype } : undefined;

    const sscFile = fileToBuffer(req.files?.sscFile?.[0]);
    const hscFile = fileToBuffer(req.files?.hscFile?.[0]);
    const uniFile = fileToBuffer(req.files?.uniFile?.[0]);
    const profileImage = fileToBuffer(req.files?.profileImage?.[0]);

    if (userInfo) {
      // Update existing
      userInfo.sscGpa = sscGpa || userInfo.sscGpa;
      userInfo.hscGpa = hscGpa || userInfo.hscGpa;
      userInfo.university = university || userInfo.university;
      userInfo.uniGpa = uniGpa || userInfo.uniGpa;
      userInfo.message = message || userInfo.message;

      if (sscFile) userInfo.sscFile = sscFile;
      if (hscFile) userInfo.hscFile = hscFile;
      if (uniFile) userInfo.uniFile = uniFile;
      if (profileImage) userInfo.profileImage = profileImage;

      await userInfo.save();
      return res.json({ success: true, message: "Info updated", userInfo });
    } else {
      // Create new
      userInfo = new UserInfo({
        email,
        sscGpa,
        hscGpa,
        university,
        uniGpa,
        message,
        sscFile,
        hscFile,
        uniFile,
        profileImage,
      });

      await userInfo.save();
      return res.json({ success: true, message: "Info created", userInfo });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
