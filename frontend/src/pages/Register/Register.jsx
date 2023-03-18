import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./register.css";

const baseUrl = 'http://localhost:4000/api';

const Register = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/auth/signup`, formData);
      const { signature } = res.data;

      localStorage.setItem('signature', signature);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.Error);
    }
  };


return (
  <div className='register-container'>
      <div className="intro-container">
          <p>Lets get started</p>
      </div>
      
      <div className='user-detail'>
          {/* <Card > */}
            <form onSubmit={handleSubmit} className="form">
            <div>
                <label htmlFor="name">Name</label>
                <input type="name" name="name" id="name" placeholder='enter your name' onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='enter your email address' onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input type="phone" name="phone" id="phone" placeholder='enter your phone number' onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='enter your password' onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="confirm_password">Confirm <br /> Password</label>
                <input type="password" name="confirm_password" id="confirm_password" placeholder='confirm password' onChange={handleChange}/>
              </div>

              <div>
                <div></div>
                <div className='btn-container'>
                  <button type="submit">Register</button>
                </div>
              </div>
              <div className='btn-container'>
              <p>Already have an account? <button onClick={() => { window.location.href = '/login'}}>Login</button></p>
              </div>
              
            </form>
            

          {/* </Card> */}
      </div>
  </div>
)

}
  export default Register
  
  
              
											


