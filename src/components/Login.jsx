import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { JOB_API_END_POINT } from './consts';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import './Login.css';  // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,  // Dynamically update username or password
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.withCredentials = true;
            const res = await axios.post(`${JOB_API_END_POINT}/Login`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/Home");
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
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleInputChange} 
                        className="input-field"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className="input-field"
                        required 
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
                <p className="register-link">
                    <Link to="/">Don't have an account?</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
