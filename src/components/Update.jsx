import React, { useState } from 'react';
import './RegistrationForm.css';  // Import the CSS file
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { JOB_API_END_POINT } from './consts';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import authSlice from '../redux/authSlice';

const Update= () => {
  // State for form fields
  const {selected}=useSelector(store=>store.auth)
  const {id}=useParams();
  console.log(id);
  const [formData1, setFormData] = useState({
    name: selected.name,
    email:selected.email,
    phoneNumber:selected.phoneNumber,
    designation:selected.designation,
    gender:selected.gender,
    course:selected.course,
    file: null
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData1,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData1,
      file: e.target.files[0], // Save file object in the state
    });
  };

  // Handle form submission
  const navigate=useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
        const formData = new FormData();
        formData.append("name", formData1.name);
        formData.append("email", formData1.email);
        formData.append("phoneNumber", formData1.phoneNumber);
        formData.append("designation", formData1.designation);
        formData.append("gender", formData1.gender);
        formData.append("course",formData1.course);
        if (formData1.file) {
            formData.append("file", formData1.file);
        }
        try {
            const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/Showall")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData1.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData1.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number: </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData1.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Designation: </label>
          <select name="designation" value={formData1.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label>Gender: </label>
          <select name="gender" value={formData1.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Course: </label>
          <select name="course" value={formData1.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="B-Tech">B-Tech</option>
            <option value="M-Tech">M-Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
        </div>

        <div>
          <label>Upload File: </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
