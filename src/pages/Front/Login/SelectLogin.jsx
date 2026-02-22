import React, { useState } from 'react';

function LoginRegisterForm({ role }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && (!name || !phone))) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    // TODO: Add real authentication logic here
    alert(`${isLogin ? 'Login' : 'Register'} successful for ${role}!`);
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-center text-primary-700 tracking-wide">
        {isLogin ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : `${role.charAt(0).toUpperCase() + role.slice(1)} Register`}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {!isLogin && (
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold shadow hover:from-primary-700 hover:to-secondary-700 transition">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="mt-6 text-center">
        {isLogin ? (
          <span>
            Don't have an account?{' '}
            <button className="text-primary-600 font-semibold underline" onClick={() => setIsLogin(false)}>Register</button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button className="text-primary-600 font-semibold underline" onClick={() => setIsLogin(true)}>Login</button>
          </span>
        )}
      </div>
    </div>
  );
}

export default function SelectLogin() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-10 text-gradient">Select Login Type</h2>
        <div className="space-y-4">
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow"
            onClick={() => setSelectedRole('admin')}
          >
            Admin Login
          </button>
          <button
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow"
            onClick={() => setSelectedRole('customer')}
          >
            Customer Login
          </button>
          <button
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition shadow"
            onClick={() => setSelectedRole('tailor')}
          >
            Vendor Login
          </button>
        </div>
        {selectedRole && <LoginRegisterForm role={selectedRole} />}
      </div>
    </div>
  );
} 