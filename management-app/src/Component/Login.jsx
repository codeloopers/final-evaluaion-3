import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Lap from '../Images/lap.png';
import back from '../Images/Back.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../Component/Loader'; // Import the Loader component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting

        try {
            const response = await fetch('http://localhost:3000/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user ID (optional)
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="maincontainer">
            {loading ? (
                <Loader /> // Show loader while loading
            ) : (
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
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <FaEnvelope className="icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <FaLock className="icon" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit">Log in</button>
                        </form>
                        <div className="register">
                            <p>Have no account yet? </p>
                            <Link to="/register" className="Register-btn">Register</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
