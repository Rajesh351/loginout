import React from 'react';
import   "./Singleempolye.css"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setEmpolye, setSelectdUser } from '../redux/authSlice';
import { JOB_API_END_POINT } from './consts';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Singleempolye = ({ item }) => {
    const id = item._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandeler = async () => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setEmpolye(res.data.remainingUsers));
                navigate("/Showall");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="employee-row">
            <div className="employee-data">{1}</div>
            <div className="employee-data">
                <img src={item?.profile?.profilePhoto} alt={`${item?.name}`} className="employee-img" />
            </div>
            <div className="employee-data">{item?.name}</div>
            <div className="employee-data">{item?.email}</div>
            <div className="employee-data">{item?.phoneNumber}</div>
            <div className="employee-data">{item?.designation}</div>
            <div className="employee-data">{item?.course}</div>
            <div className="employee-data">{item?.createdAt?.split("T")[0]}</div>
            <div className="employee-data action-buttons">
                <button onClick={() => dispatch(setSelectdUser(item))}>
                    <Link to={`/update/${id}`}>Edit</Link>
                </button>
                <button onClick={deleteHandeler}>Delete</button>
            </div>
        </div>
    );
};
