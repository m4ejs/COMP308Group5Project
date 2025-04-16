import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { POST_NEWS } from '../graphql/operations';

const PostNews = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState('news'); // "news" or "discussion"
    const [summary, setSummary] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const authorId = user?.id;

    const [postNews, { loading, error }] = useMutation(POST_NEWS);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🛰 Submitting with postType:", postType); // ✅ Add this
        console.log("🧾 Full submission:", { title, content, authorId, type: postType });

        try {
            const { data } = await postNews({
                variables: {
                    title,
                    content,
                    authorId,
                    type: postType // ✅ THIS is what was being missed!
                }
            });

            setSummary(data.postNews.summary);
        } catch (err) {
            console.error('❌ Error:', err.message);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl mb-4">📝 Post News / Discussion</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="news">News</option>
                    <option value="discussion">Discussion</option>
                </select>

                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Write your content..."
                    className="border p-2 rounded h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Submit'}
                </button>
            </form>

            {summary && (
                <div className="mt-6 bg-gray-100 p-4 rounded">
                    <h4 className="font-semibold mb-2">🧠 AI Summary:</h4>
                    <p>{summary}</p>
                </div>
            )}

            {error && <p className="text-red-500 mt-4">❌ Error: {error.message}</p>}
        </div>
    );
};

export default PostNews;
