import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SubscriptionPage from './pages/subscriptionPage';
import SuccessPage from './pages/successPage';
import CancelPage from './pages/cancelPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

const StripeRoute = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success === 'true') {
        return <SuccessPage />;
    }

    if (canceled === 'true') {
        return <CancelPage />;
    }

    return (
        <div>
            <h1>Invalid Page</h1>
            <a href="/">Return to Home</a>
        </div>
    );
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Check for the existence of an authentication cookie
        const cookieMatch = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
        return Boolean(cookieMatch);
    });
    
    const handleLogout = () => {
        // clear cookies
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/stripe" element={<StripeRoute />} />
                {/* Other routes */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
