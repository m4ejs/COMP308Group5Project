import { useQuery } from '@apollo/client';
import { GET_ALL_NEWS } from '../graphql/operations';

const AllNews = () => {
    const { data, loading, error } = useQuery(GET_ALL_NEWS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading news.</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">📰 All News</h2>
            {data.newsFeed.map((news) => (
                <div key={news.id} className="border p-4 rounded mb-3">
                    <h3 className="text-lg font-semibold">
                        [{news.type?.toUpperCase() || 'NEWS'}] {news.title}
                    </h3>

                    <p className="text-gray-700 mt-2">{news.content}</p>

                    {news.summary && (
                        <p className="italic text-sm text-gray-500 mt-2">
                            AI Summary: {news.summary}
                        </p>
                    )}

                    <p className="text-xs text-gray-400 mt-1">
                        Posted on:{' '}
                        {news.createdAt && !isNaN(Date.parse(news.createdAt))
                            ? new Date(news.createdAt).toLocaleString('en-US')
                            : 'Date not available'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AllNews;
