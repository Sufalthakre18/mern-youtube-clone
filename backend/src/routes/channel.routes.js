import express from 'express';
import {
  createChannel,
  getChannelById,
  getMyChannel,
} from '../controllers/channel.controller.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createChannel);
router.get('/my/channel', protect, getMyChannel);
router.get('/:id', getChannelById);

export default router;