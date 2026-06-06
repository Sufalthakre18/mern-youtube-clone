import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Channel from './models/Channel.js';
import Video from './models/Video.js';
import Comment from './models/Comment.js';

dotenv.config();

console.log(process.env.MONGO_URI);

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  // Clear existing data
  await User.deleteMany();
  await Channel.deleteMany();
  await Video.deleteMany();
  await Comment.deleteMany();

  // Create users
  const hashedPw = await bcrypt.hash('password123', 10);

  const user1 = await User.create({
    username: 'JohnDoe',
    email: 'john@example.com',
    password: hashedPw,
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=FF0000&color=fff',
  });

  const user2 = await User.create({
    username: 'JaneDoe',
    email: 'jane@example.com',
    password: hashedPw,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0000FF&color=fff',
  });

  // Create channel
  const channel1 = await Channel.create({
    channelName: 'Code with John',
    owner: user1._id,
    description: 'Coding tutorials and tech reviews by John Doe.',
    channelBanner: 'https://via.placeholder.com/1280x350?text=Code+with+John',
    subscribers: 5200,
  });

  await User.findByIdAndUpdate(user1._id, { $push: { channels: channel1._id } });

  // Create videos
  const videosData = [
    {
      title: 'Learn React in 30 Minutes',
      description: 'A quick tutorial to get started with React.',
      thumbnailUrl: 'https://picsum.photos/seed/react/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'React',
      views: 15200,
    },
    {
      title: 'JavaScript ES6 Full Guide',
      description: 'Everything about modern JavaScript ES6+ features.',
      thumbnailUrl: 'https://picsum.photos/seed/js/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'JavaScript',
      views: 9800,
    },
    {
      title: 'Node.js Crash Course',
      description: 'Build REST APIs with Node.js and Express.',
      thumbnailUrl: 'https://picsum.photos/seed/node/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Node.js',
      views: 12400,
    },
    {
      title: 'Data Structures in 1 Hour',
      description: 'Arrays, Linked Lists, Trees, Graphs explained simply.',
      thumbnailUrl: 'https://picsum.photos/seed/ds/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Data Structures',
      views: 7300,
    },
    {
      title: 'Python for Beginners',
      description: 'Learn Python from scratch in this beginner-friendly course.',
      thumbnailUrl: 'https://picsum.photos/seed/python/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Python',
      views: 21000,
    },
    {
      title: 'Top 10 Songs Right Now',
      description: 'Trending music you need to hear this week.',
      thumbnailUrl: 'https://picsum.photos/seed/music/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Music',
      views: 45000,
    },
    {
      title: 'Gaming Setup 2024',
      description: 'My complete gaming setup tour.',
      thumbnailUrl: 'https://picsum.photos/seed/gaming/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Gaming',
      views: 33000,
    },
    {
      title: 'Trending Tech News This Week',
      description: 'What happened in tech this week.',
      thumbnailUrl: 'https://picsum.photos/seed/tech/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Trending',
      views: 18200,
    },
    {
      title: 'Web Development Roadmap 2024',
      description: 'Complete roadmap to become a full-stack web developer.',
      thumbnailUrl: 'https://picsum.photos/seed/webdev/320/180',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      channelId: channel1._id,
      uploader: user1._id,
      category: 'Web Development',
      views: 27500,
    },
  ];

  const videos = await Video.insertMany(videosData);

  // Link videos to channel
  await Channel.findByIdAndUpdate(channel1._id, {
    $push: { videos: { $each: videos.map((v) => v._id) } },
  });

  // Create some comments
  await Comment.create([
    {
      text: 'Great video! Very helpful.',
      videoId: videos[0]._id,
      userId: user2._id,
    },
    {
      text: 'Thanks for making this so easy to understand!',
      videoId: videos[0]._id,
      userId: user1._id,
    },
    {
      text: 'Please make more videos like this.',
      videoId: videos[1]._id,
      userId: user2._id,
    },
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('👤 Test login — Email: john@example.com | Password: password123');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});