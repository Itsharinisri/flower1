import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style2.css';

const UserDetails = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id && name && date) {
            // Navigate to /flowershop and pass the user details as state
            navigate('/flowershop', { state: { id, name, date } });
        } else {
            alert('Please fill all fields');
        }
    };

    return (
        <div className="user-details-container">
            {/* Top shop name and background theme */}
            <header className="shop-header">
                <h1 className="shop-name">A.M.K Flower Shop</h1>
            </header>

            {/* Navigation bar with links */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/flowershop">Flower Shop</Link></li>
                    <li><Link to="/other">Other Page</Link></li>
                </ul>
            </nav>

            {/* Main content - User Details form */}
            <div className="form-container">
                <h1 className="form-heading">User Details</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID:</label>
                        <input 
                            type="text" 
                            value={id} 
                            onChange={(e) => setId(e.target.value)} 
                            placeholder="Enter your ID"
                            required 
                        />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter your Name"
                            required 
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Proceed</button>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
