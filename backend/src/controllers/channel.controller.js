import Channel from '../models/Channel.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

// @route  POST /api/channels  (protected)
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    if (!channelName) {
      return res.status(400).json({ message: 'Channel name is required' });
    }

    const existing = await Channel.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You already have a channel' });
    }

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user._id,
    });

    // Link channel to user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { channels: channel._id },
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/channels/:id
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'username avatar')
      .populate({
        path: 'videos',
        populate: { path: 'uploader', select: 'username' },
      });

    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/channels/my/channel  (protected)
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user._id })
      .populate('owner', 'username avatar')
      .populate({
        path: 'videos',
        populate: { path: 'channelId', select: 'channelName' },
      });

    if (!channel) {
      return res.status(404).json({ message: 'No channel found. Please create one.' });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};