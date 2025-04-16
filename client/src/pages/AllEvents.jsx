import { useQuery } from '@apollo/client';
import { GET_ALL_EVENTS } from '../graphql/operations';
import { useNavigate } from 'react-router-dom';

const AllEvents = () => {
    const { data, loading, error } = useQuery(GET_ALL_EVENTS);
    const navigate = useNavigate();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading events.</p>;

    const handleCreateEvent = () => {
        // Logic to create an event
        navigate('/create-event');
        console.log('Create Event button clicked');
    };
    return (
        <div className="p-6">
            <button onClick={handleCreateEvent}>Create an Event</button>
            <h2 className="text-xl mb-4">📅 All Events</h2>
            {data.events.map((event) => (
                <div key={event.id} className="border p-4 rounded mb-3">
                    <h3 className="text-lg font-semibold">
                        {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">Organized by: {event.organizer.username}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Starts on:{' '}
                        {event.date && !isNaN(Date.parse(event.date))
                            ? new Date(event.date).toLocaleString('en-US')
                            : 'Date not available'}
                    </p>

                    <p className="text-gray-700 mt-2">{event.description}</p>

                </div>
            ))}
        </div>
    );
};

export default AllEvents;
