import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EVENT } from '../graphql/operations';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const organizer = user?.id;

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🧾 Full submission:", { title, description, date, organizer });

        try {
            const { data } = await createEvent({
                variables: {
                    title,
                    description,
                    date,
                    organizerId: organizer,
                }
            });
            console.log("Results:",data);
        } catch (err) {
            console.error('❌ Error:', err.message);
        }
    };


    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl mb-4">📝 Create Event</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <label className="text-sm text-gray-600">
                    Event Name
                </label>
                <input
                    type="text"
                    placeholder="Event Name"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label className="text-sm text-gray-600">
                    Event Description
                </label>
                <textarea
                    placeholder="Event Description"
                    className="border p-2 rounded h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <label className="text-sm text-gray-600">
                    Start Date
                </label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <br />
                
                <br />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Submit'}
                </button>
            </form>

            {error && <p className="text-red-500 mt-4">❌ Error: {error.message}</p>}
        </div>
    );
};

export default CreateEvent;
