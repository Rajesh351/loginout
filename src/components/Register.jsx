import React, { useState } from 'react';
import './Register.css';  // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from './consts';
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Assuming you're using toast for notifications

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update username or password
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        //console.log(formData)
        e.preventDefault();
        try {
            axios.withCredentials=true;
            const res = await axios.post(`${JOB_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/Login");
                setFormData({
                    username: '',
                    password: ''
                });
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"  // This is important to link with state
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"  // This is important to link with state
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
                <p><Link to={"/Login"}>you have an account</Link></p>
            </form>
        </div>
    );
};

export default Register;
