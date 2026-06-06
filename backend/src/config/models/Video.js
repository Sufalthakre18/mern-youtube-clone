import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: 'https://via.placeholder.com/320x180?text=Thumbnail',
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: [
        'All',
        'Web Development',
        'JavaScript',
        'Data Structures',
        'Python',
        'Music',
        'Gaming',
        'Trending',
        'React',
        'Node.js',
      ],
      default: 'Web Development',
    },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// Text index for search by title
videoSchema.index({ title: 'text', description: 'text' });

const Video = mongoose.model('Video', videoSchema);
export default Video;