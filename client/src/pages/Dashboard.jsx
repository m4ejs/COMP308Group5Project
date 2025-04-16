import { useQuery } from '@apollo/client';
import { GET_ALL_BUSINESSES } from '../graphql/operations';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    if (!user) {
        return <div className="p-4">Loading user info...</div>;
    }

    const handleNav = (path) => navigate(path);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl mb-4">Hello, {user.username} 👋</h2>

            <p className="mb-6 text-gray-600">Role: <strong>{user.role}</strong></p>

            {user.role === 'resident' && (
                <div className="space-y-3">
                    <button onClick={() => handleNav('/news')} className="bg-blue-600 text-white p-3 rounded w-full">View Local News</button>
                    <button onClick={() => handleNav('/post-news')} className="bg-blue-600 text-white p-3 rounded w-full">Post News</button>
                    <button onClick={() => handleNav('/request-help')} className="bg-blue-600 text-white p-3 rounded w-full">Request Help</button>
                    <button onClick={() => handleNav('/alerts')} className="bg-blue-600 text-white p-3 rounded w-full">Emergency Alerts</button>
                </div>
            )}

            {user.role === 'business_owner' && (
                <div className="space-y-3">
                    <button onClick={() => handleNav('/business-listings')} className="bg-green-600 text-white p-3 rounded w-full">Manage Business Listings</button>
                    <button onClick={() => handleNav('/post-deals')} className="bg-green-600 text-white p-3 rounded w-full">Post New Deals</button>
                    <button onClick={() => handleNav('/reviews')} className="bg-green-600 text-white p-3 rounded w-full">Respond to Reviews</button>
                </div>
            )}

            {user.role === 'community_organizer' && (
                <div className="space-y-3">
                    <button onClick={() => handleNav('/events')} className="bg-purple-600 text-white p-3 rounded w-full">Create / Manage Events</button>
                    <button onClick={() => handleNav('/volunteers')} className="bg-purple-600 text-white p-3 rounded w-full">Manage Volunteers</button>
                    <button onClick={() => handleNav('/insights')} className="bg-purple-600 text-white p-3 rounded w-full">Community Insights</button>
                </div>
            )}


            <button
                onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }}
                className="mt-6 text-sm text-red-500 underline"
            >
                Log Out
            </button>
        </div>
    );
}

export default Dashboard;
