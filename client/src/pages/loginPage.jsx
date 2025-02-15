import { useState } from "react";
import SigninForm from "../components/auth/signin";
import SignupForm from "../components/auth/signup";

const LoginPage = ({ setIsLoggedIn }) => {
    const [isSignUp, setisSignUp] = useState(true);

    const toggleForm = () => {
        setisSignUp(!isSignUp);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                {isSignUp ? (
                    <>
                        <h1>Sign Up</h1>
                        <SignupForm toggleForm={toggleForm} />
                    </>
                ) : (
                    <>
                        <h1>Sign In</h1>
                        <SigninForm setIsLoggedIn={setIsLoggedIn} />
                    </>
                )}
                <button onClick={toggleForm} className="toggle-button">
                    {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;