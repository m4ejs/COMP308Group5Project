import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { POST_HELP_REQUEST, GET_ALL_HELP_REQUESTS } from '../graphql/operations';
import { useNavigate } from 'react-router-dom';

function RequestHelp() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const [postHelpRequest] = useMutation(POST_HELP_REQUEST, {
        refetchQueries: [{ query: GET_ALL_HELP_REQUESTS }],
        awaitRefetchQueries: true,
    });

    const { data, loading, error } = useQuery(GET_ALL_HELP_REQUESTS);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const requesterId = user?._id || user?.id;

        if (!requesterId) {
            alert('User not found! Please login.');
            return;
        }

        try {
            await postHelpRequest({
                variables: {
                    title,
                    description,
                    requesterId,
                },
            });
            setMessage('✅ Help request posted successfully!');
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error('Error:', err.message);
            setMessage('❌ Failed to post help request.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Request Help</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Request Title"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Describe your need..."
                    className="border p-2 rounded h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>

            {message && <p className="mt-4">{message}</p>}

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Help Requests</h3>
                {loading ? (
                    <p>Loading help requests...</p>
                ) : error ? (
                    <p className="text-red-500">Error loading help requests.</p>
                ) : (
                    <>
                        {data?.helpRequests.length === 0 ? (
                            <p className="italic text-gray-500">No help requests yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {data.helpRequests.map((req) => (
                                    <li key={req.id} className="border p-3 rounded shadow-sm">
                                        <h4 className="text-md font-bold">{req.title}</h4>
                                        <p className="text-sm">{req.description}</p>
                                        <p className="text-xs text-gray-500">Status: {req.status}</p>
                                        <p className="text-xs text-gray-500">
                                            Requested by: {req.requester?.username || 'Unknown'}
                                        </p>
                                        <p className="text-xs text-green-600">
                                            Matched Volunteer: {req.matchedVolunteer?.username || 'None yet'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default RequestHelp;
