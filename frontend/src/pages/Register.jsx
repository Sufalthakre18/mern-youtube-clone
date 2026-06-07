import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username || form.username.length < 3)
      newErrors.username = 'Username must be at least 3 characters';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Please enter a valid email';
    if (!form.password || form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate('/login');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ name, label, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          errors[name] ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">▶</div>
            <span className="text-xl font-bold">YouTube</span>
          </div>
        </div>

        <h1 className="text-2xl font-medium text-center mb-1">Create account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">to continue to YouTube</p>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field name="username" label="Username" placeholder="Choose a username" />
          <Field name="email" label="Email" type="email" placeholder="Enter your email" />
          <Field name="password" label="Password" type="password" placeholder="At least 6 characters" />
          <Field name="confirmPassword" label="Confirm Password" type="password" placeholder="Repeat password" />

          <div className="flex justify-between items-center pt-2">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Sign in instead
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Creating...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;