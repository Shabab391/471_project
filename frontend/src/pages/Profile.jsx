import { useState, useEffect } from "react";
import api from "../lib/axios"
import Navbar from "./components/navbar";

export default function AboutYouForm() {
  const [formData, setFormData] = useState({
    sscGpa: "",
    hscGpa: "",
    university: "",
    uniGpa: "",
    message: "",
    email: "",
    sscFile: null,
    hscFile: null,
    uniFile: null,
    profileImage: null,
  });

  // Fetch existing data for logged-in user
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail)
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        const res = await api.get(
          `/profile/get-info/${userEmail}`
        );
        if (res.data.success) {
          const user = res.data.userInfo;

          setFormData((prev) => ({
            ...prev,
            sscGpa: user.sscGpa || "",
            hscGpa: user.hscGpa || "",
            university: user.university || "",
            uniGpa: user.uniGpa || "",
            message: user.message || "",
            email: user.email || userEmail,
            profileImage: user.profileImage || null, // base64 string if exists
          }));
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchData();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      const res = await api.post(
        "/profile/update-info",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        alert("Info updated successfully!");
      } else {
        alert("Error updating info.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating info.");
    }
  };

  // For preview (base64 string from DB or new upload)
  const profileImagePreview =
    typeof formData.profileImage === "string"
      ? formData.profileImage // base64 from DB
      : formData.profileImage
      ? URL.createObjectURL(formData.profileImage) // new upload
      : null;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-base-100 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-6">
          {/* Left side form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-2xl shadow-md"
          >
            <h1 className="text-3xl font-bold">About You</h1>
            <p className="text-gray-500">Background Information</p>

            <h2 className="text-xl font-semibold mt-4">Qualifications</h2>

            {/* SSC/O Level */}
            <div>
              <label className="block font-medium">SSC/O Level GPA</label>
              <input
                type="text"
                name="sscGpa"
                value={formData.sscGpa}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="file"
                name="sscFile"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full mt-2"
              />
            </div>

            {/* HSC/A Level */}
            <div>
              <label className="block font-medium">HSC/A Level GPA</label>
              <input
                type="text"
                name="hscGpa"
                value={formData.hscGpa}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="file"
                name="hscFile"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full mt-2"
              />
            </div>

            {/* University */}
            <div>
              <label className="block font-medium">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Name of Institution"
              />
              <input
                type="text"
                name="uniGpa"
                value={formData.uniGpa}
                onChange={handleChange}
                className="input input-bordered w-full mt-2"
                placeholder="GPA"
              />
              <input
                type="file"
                name="uniFile"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full mt-2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-medium">Your message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Enter any relevant information..."
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="email@example.com"
              />
            </div>

            <button type="submit" className="btn btn-block btn-neutral mt-4">
              Submit
            </button>
          </form>

          {/* Right side image */}
          <div>
            <label className="block font-medium">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full mt-2"
            />

            {profileImagePreview && (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="rounded-2xl shadow-md object-cover w-40 h-40 mt-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
