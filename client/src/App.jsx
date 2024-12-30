import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import Subscription from './pages/landingPage';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to PayMe!</h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/landing" element={<Subscription />}></Route>
                {/* Other routes */}
            </Routes>
        </Router>
    );
}

export default App;
