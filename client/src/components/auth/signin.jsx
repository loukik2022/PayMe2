import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../api/authApi';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signin(formData);
            console.log('Signin successful:', data);
            
            // Store the token in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            navigate('/landing');
        } catch (err) {
            setError(err.message); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Sign In</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Signin;