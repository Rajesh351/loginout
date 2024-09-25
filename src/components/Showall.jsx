import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Singleempolye } from './Singleempolye';
import './Showall.css';
import Navbar from './Navbar';

export const Showall = () => {
    const [searchQuery, setSearchQuery] = useState(''); // For search input
    const { empolye } = useSelector((store) => store.auth); // Get the employee list from Redux store

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter employees based on search query (name or email)
    const filteredEmployees = empolye?.filter((employee) => {
        const searchLower = searchQuery.toLowerCase(); // Convert query to lowercase for case-insensitive matching
        return (
            employee.name.toLowerCase().includes(searchLower) ||
            employee.email.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div>
            <Navbar />

            {/* Search bar */}


            {/* Display employee list */}
            {!filteredEmployees ? (
                <div className="info-bar">
                    <li>Employee list</li>
                    <li>Total count: 0</li>
                    <li><Link to="/create/employe">Create employee</Link></li>
                </div>
            ) : (
                <div className="showall-container">
                    <div className="info-bar">
                        <li>Employee list</li>
                        <li>Total count: {filteredEmployees.length}</li>
                        <li><Link to="/create/employe">Create employee</Link></li>
                    </div>
                    <div className="search-form">
                        <p>Search</p>
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>

                    {filteredEmployees.length === 0 ? (
                        <h1>No Employee found</h1>
                    ) : (
                        <div className="employee-table">
                            <div className="employee-header">
                                <div>ID</div>
                                <div>Image</div>
                                <div>Name</div>
                                <div>Email</div>
                                <div>Mobile No</div>
                                <div>Designation</div>
                                <div>Course</div>
                                <div>Create-Date</div>
                                <div>Action</div>
                            </div>

                            {filteredEmployees.map((item, index) => (
                                <Singleempolye key={index} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
