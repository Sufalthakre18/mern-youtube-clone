import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPencil, HiTrash, HiPlus, HiX } from 'react-icons/hi';
import Header from '../components/Header.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

const CATEGORIES = ['Web Development', 'JavaScript', 'React', 'Node.js', 'Python', 'Data Structures', 'Music', 'Gaming', 'Trending'];

// Modal for creating/editing a video
const VideoModal = ({ onClose, onSave, channelId, editVideo }) => {
  const [form, setForm] = useState({
    title: editVideo?.title || '',
    description: editVideo?.description || '',
    videoUrl: editVideo?.videoUrl || '',
    thumbnailUrl: editVideo?.thumbnailUrl || '',
    category: editVideo?.category || 'Web Development',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.videoUrl) {
      setError('Title and Video URL are required');
      return;
    }
    setLoading(true);
    try {
      if (editVideo) {
        await api.put(`/videos/${editVideo._id}`, form);
      } else {
        await api.post('/videos', { ...form, channelId });
      }
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editVideo ? 'Edit Video' : 'Add Video'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'title', label: 'Title *', placeholder: 'Enter video title' },
            { name: 'videoUrl', label: 'Video URL *', placeholder: 'https://example.com/video.mp4' },
            { name: 'thumbnailUrl', label: 'Thumbnail URL', placeholder: 'https://example.com/thumb.jpg' },
            { name: 'description', label: 'Description', placeholder: 'Short description...' },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              {name === 'description' ? (
                <textarea
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              ) : (
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-full border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal for creating a channel
const CreateChannelModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({ channelName: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.channelName.trim()) {
      setError('Channel name is required');
      return;
    }
    setLoading(true);
    try {
      await api.post('/channels', form);
      onCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create channel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">How you'll appear</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
            <svg className="w-14 h-14 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">Select picture</p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Name</label>
            <input
              type="text"
              value={form.channelName}
              onChange={(e) => setForm({ ...form, channelName: e.target.value })}
              className="w-full border-b border-gray-300 focus:border-blue-500 pb-1 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Handle</label>
            <input
              type="text"
              value={`@${form.channelName.replace(/\s+/g, '').toLowerCase()}`}
              readOnly
              className="w-full border-b border-gray-200 pb-1 outline-none text-sm text-gray-500 bg-transparent"
            />
          </div>
          <p className="text-xs text-gray-500">
            By clicking Create Channel you agree to YouTube's Terms of Service.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm hover:bg-gray-50 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create channel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChannelPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    fetchChannel();
  }, []);

  const fetchChannel = async () => {
    setLoading(true);
    try {
      const res = await api.get('/channels/my/channel');
      setChannel(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setChannel(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Delete this video permanently?')) return;
    try {
      await api.delete(`/videos/${videoId}`);
      fetchChannel();
    } catch (err) {
      console.error(err);
    }
  };

  const formatViews = (v) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
    return v;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header onToggleSidebar={() => {}} onSearch={() => navigate('/')} />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onToggleSidebar={() => {}} onSearch={(q) => navigate(`/?search=${q}`)} />

      <div className="pt-14">
        {!channel ? (
          /* No Channel — Show Create Prompt */
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <svg className="w-14 h-14 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Create a channel to get started</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              A YouTube channel is required to upload videos and interact with the community.
            </p>
            <button
              onClick={() => setShowCreateChannel(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create channel
            </button>
          </div>
        ) : (
          /* Channel Exists — Show Channel Page */
          <>
            {/* Banner */}
            <div
              className="w-full h-32 sm:h-48 bg-gradient-to-r from-blue-400 to-purple-500"
              style={{
                backgroundImage: `url(${channel.channelBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Channel Info */}
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 py-4 border-b border-gray-200">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold -mt-8 sm:-mt-12 border-4 border-white shadow">
                  {channel.channelName[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{channel.channelName}</h1>
                  <p className="text-sm text-gray-500">
                    {channel.subscribers?.toLocaleString()} subscribers •{' '}
                    {channel.videos?.length} videos
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{channel.description}</p>
                </div>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <HiPlus className="w-4 h-4" />
                  Add Video
                </button>
              </div>

              {/* Tabs (static) */}
              <div className="flex gap-6 mt-2 border-b border-gray-200">
                {['Videos', 'Playlists', 'About'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                      i === 0
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Videos Grid */}
              <div className="py-6">
                {channel.videos?.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <p className="text-lg font-medium">No videos yet</p>
                    <p className="text-sm">Click "Add Video" to upload your first video.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {channel.videos?.map((video) => (
                      <div key={video._id} className="group relative">
                        {/* Thumbnail */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://picsum.photos/seed/${video._id}/320/180`;
                            }}
                          />
                          {/* Action buttons overlay */}
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingVideo(video);
                                setShowVideoModal(true);
                              }}
                              className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                            >
                              <HiPencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video._id)}
                              className="p-1.5 bg-white rounded-full shadow hover:bg-red-50 hover:text-red-600"
                            >
                              <HiTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-semibold line-clamp-2">{video.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {formatViews(video.views)} views
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showCreateChannel && (
        <CreateChannelModal
          onClose={() => setShowCreateChannel(false)}
          onCreated={fetchChannel}
        />
      )}

      {showVideoModal && (
        <VideoModal
          onClose={() => {
            setShowVideoModal(false);
            setEditingVideo(null);
          }}
          onSave={fetchChannel}
          channelId={channel?._id}
          editVideo={editingVideo}
        />
      )}
    </div>
  );
};

export default ChannelPage;