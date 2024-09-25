import React from 'react';
import './Navbar.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { JOB_API_END_POINT } from './consts';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { setUser } from '../redux/authSlice';
import useGetallemploye from '../hooks/useuseGetAllEmploye';

const Navbar = () => {  
  useGetallemploye();
   const {user}=useSelector(store=>store.auth)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const Logouthandler=async()=>{
        try {
            axios.withCredentials=true;
            const res = await axios.post(`${JOB_API_END_POINT}/Logout`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
    
            if (res.data.success) {
              dispatch(setUser(null))
                toast.success(res.data.message);
                navigate("/Login");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/Showall">Employee List</Link></li>
        <li><Link to="/dashbord">{user?.username}</Link></li>
        <li  onClick={Logouthandler}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;

