import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';
import { HiOutlineUser } from 'react-icons/hi';

const CommentSection = ({ videoId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/comments', { text: newComment, videoId });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (commentId) => {
    try {
      const res = await api.put(`/comments/${commentId}`, { text: editText });
      setComments(comments.map((c) => (c._id === commentId ? res.data : c)));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">{comments.length} Comments</h3>

      {/* Add Comment */}
      {user ? (
        <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold text-sm shrink-0 overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              user.username?.[0]?.toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border-b border-gray-300 focus:border-blue-500 pb-1 outline-none text-sm"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setNewComment('')}
                className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newComment.trim() || loading}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Please{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            sign in
          </a>{' '}
          to add a comment.
        </p>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm shrink-0 overflow-hidden">
              {comment.userId?.avatar ? (
                <img
                  src={comment.userId.avatar}
                  alt={comment.userId.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <HiOutlineUser className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  @{comment.userId?.username || 'User'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>

              {editingId === comment._id ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border-b border-blue-500 pb-1 outline-none text-sm"
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-xs rounded-full hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEdit(comment._id)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-800 mt-0.5">{comment.text}</p>
                  {user?._id === comment.userId?._id && (
                    <div className="flex gap-3 mt-1">
                      <button
                        onClick={() => {
                          setEditingId(comment._id);
                          setEditText(comment.text);
                        }}
                        className="text-xs text-gray-500 hover:text-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;