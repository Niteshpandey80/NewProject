import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate('/Home');
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border'
              placeholder='Enter email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border'
              placeholder='*********'
              required
            />
          </div>
          <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
          <p className='text-center mt-2'>
            Don't have an account? <Link to="/register" className='text-teal-600'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
