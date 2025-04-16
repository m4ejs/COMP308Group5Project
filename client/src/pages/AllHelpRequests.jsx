import { useQuery } from '@apollo/client';
import { GET_ALL_HELP_REQUESTS } from '../graphql/operations';

const AllHelpRequests = () => {
    const { data, loading, error } = useQuery(GET_ALL_HELP_REQUESTS);

    if (loading) return <p>Loading help requests...</p>;
    if (error) return <p>Error loading help requests.</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl mb-4">🆘 All Help Requests</h2>
            {data.helpRequests.length === 0 ? (
                <p>No help requests found.</p>
            ) : (
                data.helpRequests.map((req) => (
                    <div key={req._id} className="border p-4 rounded mb-3">
                        <h3 className="text-lg font-semibold">{req.title}</h3>
                        <p className="text-gray-700">{req.description}</p>
                        <p className="text-sm text-gray-600 mt-1">Status: {req.status}</p>
                        <p className="text-sm text-gray-500 mt-1">Requester: {req.requester?.name || 'Unknown'}</p>
                        {req.matchedVolunteer && (
                            <p className="text-sm text-green-600 mt-1">
                                Matched Volunteer: {req.matchedVolunteer.name}
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AllHelpRequests;
