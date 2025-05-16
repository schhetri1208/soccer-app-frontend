import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        location: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({...prev,[e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post('http://localhost:8080/api/auth/register', formData);
            alert('Registration successful.');
            navigate('/');
        }
        catch(err){
            alert('Registration failed.');
            console.error(err);
        }
    };
    return (
        <div style={{padding: '20px'}}>
            <h2>Register</h2>
            <form>
                <div>
                    <label>First Name:</label><br />
                    <input type="text" name="firstName" onChange= {handleChange} required></input>
                </div>               
                <div>
                    <label>Last Name:</label><br />
                    <input type="text" name="lastName" onChange= {handleChange} required></input>
                </div>
                <div>
                    <label>Email:</label><br />
                    <input type="email" name="email" onChange= {handleChange} required></input>
                </div>
                <div>
                    <label>Password:</label><br />
                    <input type="password" name="password" onChange= {handleChange} required></input>
                </div>
                <div>
                    <label>Location:</label><br />
                    <input type="text" name="location" onChange= {handleChange} required></input>
                </div>
                <div style= {{marginTop: "10px"}}>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p style={{marginTop: "10px"}}>
                Already have an account? <Link to="/">Log in here</Link>
            </p>
            {/* 👀 Watch formData state live */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
    );
}

export default RegisterPage;