import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://13.59.54.29:8080/api/auth/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token); // store token for future API calls

      alert('Login successful!');
      // redirect to homepage or dashboard (we'll add router later)
    } catch (error) {
      setErrorMessage(error.response?.data || 'Login failed. Try again.');
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" style={{ marginTop: "15px" }}>Login</button>
      </form>
      <p style={{marginTop: "10px"}}>
        Don't have an account?<Link to={"/register"}>Register here</Link></p>
    </div>
  );
}

export default LoginPage;

