import Comment from '../models/Comment.js';

// @route  GET /api/comments/:videoId
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/comments  (protected)
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    if (!text || !videoId) {
      return res.status(400).json({ message: 'Text and videoId are required' });
    }

    const comment = await Comment.create({
      text,
      videoId,
      userId: req.user._id,
    });

    const populated = await comment.populate('userId', 'username avatar');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/comments/:id  (protected)
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    comment.text = req.body.text || comment.text;
    const updated = await comment.save();
    const populated = await updated.populate('userId', 'username avatar');

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/comments/:id  (protected)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};