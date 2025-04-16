import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../graphql/operations';

function Home() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'resident',
        location: '',
        interests: ''
    });

    const [loginUser] = useMutation(LOGIN_USER);
    const [registerUser] = useMutation(REGISTER_USER);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({
                variables: {
                    email: loginData.email,
                    password: loginData.password
                }
            });

            // Store both user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(data.login.user));  // Store user data
            localStorage.setItem('token', data.login.token);  // Store token separately

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { username, email, password, location, interests, role } = registerData;

            const { data } = await registerUser({
                variables: {
                    username,
                    email,
                    password,
                    location,
                    interests: interests.split(',').map(i => i.trim()),
                    role
                }
            });

            localStorage.setItem('user', JSON.stringify(data.register));

            // Reset form fields
            setRegisterData({
                username: '',
                email: '',
                password: '',
                role: 'resident',
                location: '',
                interests: ''
            });

            navigate('/dashboard');
        } catch (err) {
            console.error('Registration failed:', err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Login */}
                <div className="p-8 border-r border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">🔐 Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
                    </form>
                </div>

                {/* Register */}
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">📝 Register</h2>
                    <form onSubmit={handleRegister} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={registerData.location}
                            onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Interests (comma separated)"
                            value={registerData.interests}
                            onChange={(e) => setRegisterData({ ...registerData, interests: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <select
                            value={registerData.role}
                            onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                            className="w-full border p-2 rounded"
                        >
                            <option value="resident">Resident</option>
                            <option value="business_owner">Business Owner</option>
                            <option value="community_organizer">Community Organizer</option>
                        </select>

                        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
