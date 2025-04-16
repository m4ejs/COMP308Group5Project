import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import {
    GET_ALL_BUSINESSES,
    ADD_BUSINESS,
    ADD_BUSINESS_DEAL,
    REPLY_TO_REVIEW
} from '../graphql/operations';

const BusinessPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user?.role === 'business_owner';

    const [form, setForm] = useState({ name: '', description: '' });
    const [dealForm, setDealForm] = useState({ businessId: '', title: '', description: '', validUntil: '' });

    const { data, loading, error, refetch } = useQuery(GET_ALL_BUSINESSES);
    const [addBusiness] = useMutation(ADD_BUSINESS, { onCompleted: () => refetch() });
    const [addDeal] = useMutation(ADD_BUSINESS_DEAL, { onCompleted: () => refetch() });
    const [replyToReview] = useMutation(REPLY_TO_REVIEW, { onCompleted: () => refetch() });

    const handleBusinessSubmit = async (e) => {
        e.preventDefault();
        await addBusiness({ variables: { ...form, ownerId: user.id } });
        setForm({ name: '', description: '' });
    };

    const handleDealSubmit = async (e) => {
        e.preventDefault();
        await addDeal({ variables: dealForm });
        setDealForm({ businessId: '', title: '', description: '', validUntil: '' });
    };

    const handleReply = async (businessId, index, replyText) => {
        await replyToReview({
            variables: { businessId, reviewIndex: index.toString(), replyText }
        });
    };

    if (loading) return <p>Loading businesses...</p>;
    if (error) return <p>Error loading businesses.</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">🏪 Businesses</h2>

            {isOwner && (
                <form onSubmit={handleBusinessSubmit} className="space-y-3 mb-6 border p-4 rounded">
                    <h3 className="text-lg font-semibold">Add Your Business</h3>
                    <input
                        type="text"
                        placeholder="Business Name"
                        className="w-full border p-2 rounded"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full border p-2 rounded"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Business</button>
                </form>
            )}

            {data.businesses.map((biz, i) => (
                <div key={biz.id} className="border p-4 rounded mb-4">
                    <h3 className="text-lg font-bold">{biz.name}</h3>
                    <p>{biz.description}</p>

                    <h4 className="mt-2 font-semibold">Deals:</h4>
                    <ul className="list-disc pl-5">
                        {biz.deals.map((deal, i) => (
                            <li key={i}>{deal.title} – {deal.description} (Valid until: {deal.validUntil})</li>
                        ))}
                    </ul>

                    {isOwner && (
                        <form onSubmit={handleDealSubmit} className="mt-3 space-y-2">
                            <input type="hidden" value={biz.id} onChange={(e) => setDealForm({ ...dealForm, businessId: biz.id })} />
                            <input
                                type="text"
                                placeholder="Deal Title"
                                className="w-full border p-2 rounded"
                                value={dealForm.title}
                                onChange={(e) => setDealForm({ ...dealForm, title: e.target.value, businessId: biz.id })}
                            />
                            <input
                                type="text"
                                placeholder="Deal Description"
                                className="w-full border p-2 rounded"
                                value={dealForm.description}
                                onChange={(e) => setDealForm({ ...dealForm, description: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Valid Until (e.g. 2025-05-01)"
                                className="w-full border p-2 rounded"
                                value={dealForm.validUntil}
                                onChange={(e) => setDealForm({ ...dealForm, validUntil: e.target.value })}
                            />
                            <button className="bg-green-600 text-white px-3 py-1 rounded">Add Deal</button>
                        </form>
                    )}

                    {biz.reviews.length > 0 && (
                        <>
                            <h4 className="mt-4 font-semibold">Reviews:</h4>
                            <ul className="list-disc pl-5">
                                {biz.reviews.map((rev, idx) => (
                                    <li key={idx}>
                                        <p>💬 {rev.text}</p>
                                        <p className="text-sm text-gray-500">🧠 Sentiment: {rev.sentiment}</p>
                                        {isOwner && (
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    placeholder="Reply to review..."
                                                    className="border p-1 rounded w-full"
                                                    onBlur={(e) => handleReply(biz.id, idx, e.target.value)}
                                                />
                                            </div>
                                        )}
                                        {rev.reply && <p className="text-sm text-blue-600">✉️ Owner Reply: {rev.reply}</p>}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BusinessPage;
