import { Link } from 'react-router-dom';

// Format view count like YouTube: 1.5M, 240K, etc.
const formatViews = (views) => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}K views`;
  return `${views} views`;
};

// Relative time
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
};

const VideoCard = ({ video }) => {
  const channelName =
    video.channelId?.channelName || video.uploader?.username || 'Unknown Channel';
  const uploaderAvatar =
    video.uploader?.avatar ||
    `https://ui-avatars.com/api/?name=${channelName}&background=random&color=fff`;

  return (
    <Link to={`/watch/${video._id}`} className="group block">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${video._id}/320/180`;
          }}
        />
      </div>

      {/* Video Info */}
      <div className="flex gap-3 mt-3">
        <img
          src={uploaderAvatar}
          alt={channelName}
          className="w-9 h-9 rounded-full shrink-0 object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${channelName[0]}&background=FF0000&color=fff`;
          }}
        />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 hover:text-gray-800 transition-colors">
            {channelName}
          </p>
          <p className="text-xs text-gray-500">
            {formatViews(video.views)} • {timeAgo(video.createdAt || video.uploadDate)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;