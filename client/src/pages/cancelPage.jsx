import React from 'react';
import { useSearchParams } from 'react-router-dom';

const CancelPage = () => {
    const [searchParams] = useSearchParams();
    const canceled = searchParams.get('canceled');

    return (
        <div className="cancel-page">
            <h1>Subscription Payment Failed</h1>
            {canceled === 'true' && (
                <p>Please try other payment methods</p>
            )}
            <button onClick={() => window.location.href = "/"}>Return to Home</button>
        </div>
    );
};

export default CancelPage;