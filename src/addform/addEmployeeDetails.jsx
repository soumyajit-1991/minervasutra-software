import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddEmployeeDetails() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    dob: "",
    maritalStatus: "",
    gender: "",
    address: "",
    nationality: "",
    about: "",
    years: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://hr-management-h9l2.vercel.app/api/employee-profile/save",
        {
          email: user.email,
          personalInfo: {
            dob: form.dob,
            maritalStatus: form.maritalStatus,
            gender: form.gender,
            address: form.address,
            nationality: form.nationality,
          },
          about: form.about,
          experience: {
            years: form.years,
            description: form.description,
          },
          skills: form.skills.split(",").map((s) => s.trim()),
        }
      );

      navigate(`/employee-portal/${user.email}`);
    } catch (error) {
      alert("Failed to save profile");
      console.error(error);
    }
  };


  useEffect(() => {
  const fetchExistingData = async () => {
    try {
      const res = await axios.get(
        `https://hr-management-h9l2.vercel.app/api/employee-profile/${user.email}`
      );

      const data = res.data;

      setForm({
        dob: data.personalInfo?.dob || "",
        maritalStatus: data.personalInfo?.maritalStatus || "",
        gender: data.personalInfo?.gender || "",
        address: data.personalInfo?.address || "",
        nationality: data.personalInfo?.nationality || "",
        about: data.about || "",
        years: data.experience?.years || "",
        description: data.experience?.description || "",
        skills: data.skills?.join(", ") || "",
      });
    } catch (err) {
      console.error("Failed to load profile for edit", err);
    }
  };

  fetchExistingData();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl shadow p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Profile Details
        </h2>

        {/* ===== PERSONAL INFORMATION ===== */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="input border-2 rounded-xl p-1.5"
              placeholder="Date of Birth"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input border-2 rounded-xl p-1.5"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="input border-2 rounded-xl p-1.5"
            >
              <option value="">Marital Status</option>
              <option>Single</option>
              <option>Married</option>
            </select>

            <input
              type="text"
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className="input border-2 rounded-xl p-1.5"
              placeholder="Nationality"
            />

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="input md:col-span-2 border-2 rounded-xl p-1.5"
              placeholder="Address"
              rows="2"
            />
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            className="input w-full border-2 rounded-xl p-1.5"
            rows="4"
            placeholder="Write something about yourself..."
          />
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Experience
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="years"
              value={form.years}
              onChange={handleChange}
              className="input border-2 rounded-xl p-1.5"
              placeholder="Years of Experience"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input md:col-span-2 border-2 rounded-xl p-1.5"
              rows="3"
              placeholder="Describe your experience"
            />
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="input border-2 rounded-xl p-1.5"
            placeholder="React, Node.js, MongoDB"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate skills with commas
          </p>
        </section>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
