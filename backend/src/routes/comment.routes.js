import express from 'express';
import {
  getCommentsByVideo,
  addComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/:videoId', getCommentsByVideo);
router.post('/', protect, addComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;