import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fun from "../components/fun";

const HomePage = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const [updateUsers, setUpdateUsers] = useState(0);
    const [updateTransactions, setUpdateTransactions] = useState(0);
    const targetUsersCount = 10000;
    const targetTransactionsCount = 10000000;

    // Count-up effect for users
    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => {
            setUpdateUsers((prevCount) => {
                if (prevCount < targetUsersCount) {
                    const increment = Math.ceil(targetUsersCount / 200); 
                    return Math.min(prevCount + increment, targetUsersCount);
                } else {
                    clearInterval(intervalId);
                    return prevCount;
                }
            });
        }, 10); 

        return () => clearInterval(intervalId); 
    }, [targetUsersCount]);


    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => {
            setUpdateTransactions((prevCount) => {
                if (prevCount < targetTransactionsCount) {
                    const increment = Math.ceil(targetTransactionsCount / 200); 
                    return Math.min(prevCount + increment, targetTransactionsCount);
                } else {
                    clearInterval(intervalId);
                    return prevCount;
                }
            });
        }, 10); 

        return () => clearInterval(intervalId); 
    }, [targetTransactionsCount]);

    return (
        <div className="home-page">
            {/* Modern Hero Section */}
            <header className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <h1 className="hero-title">Welcome to PayMe</h1>
                    <p className="hero-subtitle">
                        Subscription Made Easy
                    </p>
                    <button
                        className="cta-button"
                        onClick={() => isLoggedIn ? navigate("/subscription") : navigate("/login")}
                    >
                        Get Started
                    </button>
                </div>
            </header>

            {/* Stats Section */}
            <section className="stats-section container">
                <div className="stats-item">
                    <span className="stats-number">{updateUsers}+</span>
                    <span className="stats-label">Active Users</span>
                </div>
                <div className="stats-item">
                    <span className="stats-number">{updateTransactions}+</span>
                    <span className="stats-label">Transactions Processed</span>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section container">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="feature-icon fas fa-bolt"></i>
                        <h3 className="feature-title">Integrated Payments</h3>
                        <p className="feature-description">
                            Integration with Stripe for payment processing.
                        </p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon fas fa-lock"></i>
                        <h3 className="feature-title">Secure Login</h3>
                        <p className="feature-description">
                            Secure user authentication mechanism using JWT token for reliable login.
                        </p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon fas fa-mobile-alt"></i>
                        <h3 className="feature-title">Track Transactions</h3>
                        <p className="feature-description">
                            MongoDB database storage to efficiently track and manage transaction records
                        </p>
                    </div>
                </div>
            </section>

            {/* Gif Section */}
            <section className="fun-section"> 
                <Fun />
            </section>
        </div>
    );
};

export default HomePage;
