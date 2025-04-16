import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EMERGENCY_ALERT, GET_ALL_EMERGENCY_ALERTS } from '../graphql/operations';

function EmergencyAlerts() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        type: ''
    });
    const [message, setMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    const [createEmergencyAlert] = useMutation(CREATE_EMERGENCY_ALERT, {
        refetchQueries: [{ query: GET_ALL_EMERGENCY_ALERTS }]
    });

    const { data, loading, error } = useQuery(GET_ALL_EMERGENCY_ALERTS);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) return alert("User not found!"); // ✅ FIXED

        try {
            await createEmergencyAlert({
                variables: {
                    ...form,
                    reporterId: user.id // ✅ FIXED
                }
            });

            setMessage("✅ Alert posted!");
            setForm({ title: '', description: '', location: '', type: '' });
        } catch (err) {
            console.error(err.message);
            setMessage("❌ Failed to post alert.");
        }
    };



    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl mb-4">🚨 Emergency Alerts</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Describe the emergency..."
                    className="border p-2 rounded h-24"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="border p-2 rounded"
                    value={form.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type (e.g. Fire, Crime)"
                    className="border p-2 rounded"
                    value={form.type}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="bg-red-600 text-white p-2 rounded">
                    Submit Alert
                </button>
            </form>

            {message && <p>{message}</p>}

            <h3 className="text-xl font-semibold mb-3">📋 Reported Alerts</h3>
            {loading ? (
                <p>Loading alerts...</p>
            ) : error ? (
                <p className="text-red-500">Error loading alerts.</p>
            ) : (
                <ul className="space-y-3">
                    {data?.emergencyAlerts.map(alert => (
                        <li key={alert.id} className="border p-3 rounded">
                            <h4 className="font-bold">{alert.title} ({alert.type})</h4>
                            <p>{alert.description}</p>
                            <p className="text-sm text-gray-500">📍 {alert.location} | Reported by: {alert.reporter?.username || 'Unknown'}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Posted on:{' '}
                                {alert.createdAt && !isNaN(Date.parse(alert.createdAt))
                                    ? new Date(alert.createdAt).toLocaleString('en-US')
                                    : 'Date not available'}
                            </p>

                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    );
}

export default EmergencyAlerts;
