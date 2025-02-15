import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../api/authApi';

const Signin = ({ setIsLoggedIn }) => {
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

            setIsLoggedIn(true);    
            navigate('/subscription');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="form-button">
                Sign In
            </button>
        </form>
    );
};

export default Signin;