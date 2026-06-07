import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  HiThumbUp,
  HiThumbDown,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiShare,
  HiDotsHorizontal,
} from 'react-icons/hi';
import Header from '../components/Header.jsx';
import CommentSection from '../components/CommentSection.jsx';
import VideoCard from '../components/VideoCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    fetchVideo();
    fetchRelated();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchVideo = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await api.get('/videos');
      setRelatedVideos(res.data.filter((v) => v._id !== id).slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    if (!user) return alert('Please sign in to like videos');
    setLikeLoading(true);
    try {
      const res = await api.put(`/videos/${id}/like`);
      setVideo((prev) => ({
        ...prev,
        likes: Array(res.data.likes).fill(null),
        dislikes: Array(res.data.dislikes).fill(null),
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert('Please sign in');
    setLikeLoading(true);
    try {
      const res = await api.put(`/videos/${id}/dislike`);
      setVideo((prev) => ({
        ...prev,
        likes: Array(res.data.likes).fill(null),
        dislikes: Array(res.data.dislikes).fill(null),
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLikeLoading(false);
    }
  };

  const isLiked = user && video?.likes?.includes(user._id);
  const isDisliked = user && video?.dislikes?.includes(user._id);
  const channelName = video?.channelId?.channelName || video?.uploader?.username || 'Unknown';

  const formatViews = (v) => {
    if (!v && v !== 0) return '0';
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
    return v;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header onToggleSidebar={() => {}} onSearch={() => {}} />
        <div className="pt-14 flex items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-white">
        <Header onToggleSidebar={() => {}} onSearch={() => {}} />
        <div className="pt-14 flex flex-col items-center justify-center h-[80vh]">
          <p className="text-xl font-semibold">Video not found</p>
          <Link to="/" className="text-blue-600 mt-2 hover:underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onSearch={() => {}} />

      <div className="pt-14">
        <div className="max-w-[1800px] mx-auto px-4 py-4 flex flex-col lg:flex-row gap-6">
          {/* Main Video Column */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
              <video
                src={video.videoUrl}
                controls
                className="w-full h-full"
                poster={video.thumbnailUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Title */}
            <h1 className="text-xl font-semibold mt-3 leading-snug">{video.title}</h1>

            {/* Channel Info + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
              {/* Channel */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold overflow-hidden">
                  {video.uploader?.avatar ? (
                    <img
                      src={video.uploader.avatar}
                      alt={channelName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    channelName[0]?.toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{channelName}</p>
                  <p className="text-xs text-gray-500">
                    {formatViews(video.views)} views
                  </p>
                </div>
                <button className="ml-4 bg-gray-900 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium">
                  Subscribe
                </button>
              </div>

              {/* Like/Dislike/Share */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                  <button
                    onClick={handleLike}
                    disabled={likeLoading}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {isLiked ? (
                      <HiThumbUp className="w-5 h-5" />
                    ) : (
                      <HiOutlineThumbUp className="w-5 h-5" />
                    )}
                    {video.likes?.length ?? 0}
                  </button>
                  <div className="w-px h-6 bg-gray-300" />
                  <button
                    onClick={handleDislike}
                    disabled={likeLoading}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {isDisliked ? (
                      <HiThumbDown className="w-5 h-5" />
                    ) : (
                      <HiOutlineThumbDown className="w-5 h-5" />
                    )}
                    {video.dislikes?.length ?? 0}
                  </button>
                </div>
                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium">
                  <HiShare className="w-5 h-5" />
                  Share
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <HiDotsHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 bg-gray-100 rounded-xl p-3">
              <p className="text-sm font-semibold">
                {formatViews(video.views)} views •{' '}
                {new Date(video.createdAt || video.uploadDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
              <p className="text-sm text-gray-700 mt-1">{video.description}</p>
            </div>

            {/* Comments */}
            <CommentSection videoId={id} />
          </div>

          {/* Sidebar — Related Videos */}
          <aside className="lg:w-96 shrink-0">
            <h3 className="text-base font-semibold mb-4 hidden lg:block">Up next</h3>
            <div className="space-y-3">
              {relatedVideos.map((v) => (
                <Link key={v._id} to={`/watch/${v._id}`} className="flex gap-2 group">
                  <div className="w-40 aspect-video rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    <img
                      src={v.thumbnailUrl}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${v._id}/160/90`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {v.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {v.channelId?.channelName || v.uploader?.username}
                    </p>
                    <p className="text-xs text-gray-500">{formatViews(v.views)} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;