import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Lap from '../Images/lap.png';
import back from '../Images/Back.png';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="maincontainer">
            <div className="login-container">
                <div className="left-panel">
                    <div className="astronaut">
                        <img src={Lap} alt="" className='lap-image' />
                        <img src={back} alt="" className='back-image' />
                    </div>
                    <h2>Welcome aboard my friend</h2>
                    <p>just a couple of clicks and we start</p>
                </div>
                <div className="right-panel">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <FaUser className="icon" />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <FaEnvelope className="icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Register</button>
                    </form>
                    <div className="register">
                        <p>Have an account? </p>
                        <Link to="/login" className="Register-btn">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
