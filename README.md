# 📺 YouTube Clone — MERN Stack Capstone Project


A full-stack YouTube clone built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). Users can browse videos, authenticate with JWT, like/dislike videos, comment, create channels, and manage their own video content.

---

## 🌐 Live Demo

### Frontend
🔗 https://mern-youtube-clone-three.vercel.app/

### Backend API
🔗 https://mern-youtube-clone-ncia.onrender.com/

> 🎬 [Watch Demo Video](https://drive.google.com/file/d/1YRZTu1C_0t4qlkFZbYGx2bR7Szyv41w2/view?usp=sharing) 
> 
> 📁 [GitHub Repository](https://github.com/Sufalthakre18/mern-youtube-clone) 

---

## ✨ Features

### 🏠 Home Page
- YouTube-style header with logo, search bar, and sign-in button
- Toggleable sidebar with navigation links (hamburger menu)
- Filter buttons (10 categories: All, React, JavaScript, Python, etc.)
- Responsive video grid — 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)
- Each video card shows: thumbnail, title, channel name, view count, upload time

### 🔐 User Authentication
- Register with username, email, password
- Login with JWT token-based authentication
- Password hashed with bcryptjs
- Form validation with inline error messages
- After login: username and avatar shown in header
- Auto-redirect after registration to login page

### 🔍 Search & Filter
- Search videos by title (real-time API call)
- Filter videos by category (10+ filter buttons)
- Search bar in header — works from any page

### 🎬 Video Player Page
- HTML5 video player with controls
- Video title, description, channel name, view count
- ✅ Like / Dislike toggle (persists per user in database)
- Full comment section:
  - Add new comments (saved to database)
  - Edit your own comments
  - Delete your own comments
- Related videos sidebar

### 📺 Channel Page
- Create your channel (modal UI like YouTube)
- View your channel with banner and subscriber count
- Add videos to your channel (with title, URL, thumbnail, category)
- Edit your existing videos
- Delete your videos
- Protected route — requires login

### 📱 Responsive Design
- Mobile: stacked layout, sidebar as overlay
- Tablet: 2-column grid, compact layout
- Desktop: 3–4 column grid, fixed sidebar

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router v7 |
| Styling | Tailwind CSS v4 (`@import` syntax) |
| HTTP Client | Axios (with JWT interceptor) |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| Icons | react-icons (Heroicons) |
| Module System | ES Modules (import/export) throughout |

---

## 📁 Project Structure

```
youtube-clone/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT protect middleware
│   │   ├── models/
│   │   │   ├── User.js             # User schema
│   │   │   ├── Video.js            # Video schema (with likes/dislikes)
│   │   │   ├── Channel.js          # Channel schema
│   │   │   └── Comment.js          # Comment schema
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── video.controller.js
│   │   │   ├── channel.controller.js
│   │   │   └── comment.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── video.routes.js
│   │   │   ├── channel.routes.js
│   │   │   └── comment.routes.js
│   │   └── seed.js                 # Database seeder (9 videos, 2 users)
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js            # Axios instance with JWT interceptor
    │   ├── components/
    │   │   ├── Header.jsx          # Top navigation bar
    │   │   ├── Sidebar.jsx         # Collapsible sidebar
    │   │   ├── VideoCard.jsx       # Video thumbnail card
    │   │   ├── FilterBar.jsx       # Category filter buttons
    │   │   ├── CommentSection.jsx  # Comment CRUD component
    │   │   └── ProtectedRoute.jsx  # Auth route guard
    │   ├── context/
    │   │   └── AuthContext.jsx     # Global auth state
    │   ├── pages/
    │   │   ├── Home.jsx            # Home page with video grid
    │   │   ├── Login.jsx           # Login form
    │   │   ├── Register.jsx        # Registration form
    │   │   ├── VideoPlayer.jsx     # Video player page
    │   │   └── ChannelPage.jsx     # Channel management page
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css               # Tailwind v4 @import + custom theme
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://cloud.mongodb.com/) account
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sufalthakre18/mern-youtube-clone
cd youtube-clone
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

> **Using MongoDB Atlas?** Replace `MONGO_URI` with your Atlas connection string.

Seed the database with sample data:

```bash
npm run seed
```

This creates:
- 2 test users
- 1 channel ("Code with John")
- 9 sample videos across all categories
- 3 sample comments

Start the backend server:

```bash
npm run dev
```

Backend runs at → `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

> Make sure the backend is running before starting the frontend.

---

### 4. Test Login Credentials

After running `npm run seed`, use these credentials:

| Field | Value |
|-------|-------|
| Email | `john@example.com` |
| Password | `password123` |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login and get JWT token |
| GET | `/api/auth/me` | ✅ | Get current user info |

### Videos
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/videos` | ❌ | Get all videos (`?search=`, `?category=`) |
| GET | `/api/videos/:id` | ❌ | Get single video (increments views) |
| POST | `/api/videos` | ✅ | Create a new video |
| PUT | `/api/videos/:id` | ✅ | Update a video |
| DELETE | `/api/videos/:id` | ✅ | Delete a video |
| PUT | `/api/videos/:id/like` | ✅ | Toggle like |
| PUT | `/api/videos/:id/dislike` | ✅ | Toggle dislike |

### Channels
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/channels` | ✅ | Create a channel |
| GET | `/api/channels/my/channel` | ✅ | Get logged-in user's channel |
| GET | `/api/channels/:id` | ❌ | Get channel by ID |

### Comments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/comments/:videoId` | ❌ | Get all comments for a video |
| POST | `/api/comments` | ✅ | Add a new comment |
| PUT | `/api/comments/:id` | ✅ | Edit your comment |
| DELETE | `/api/comments/:id` | ✅ | Delete your comment |

> ✅ = Requires `Authorization: Bearer <token>` header

---

## 🗄️ Database Schema

### User
```js
{
  username: String,   // unique, min 3 chars
  email: String,      // unique, validated
  password: String,   // bcrypt hashed
  avatar: String,     // URL
  channels: [ObjectId]
}
```

### Video
```js
{
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
  channelId: ObjectId,   // ref: Channel
  uploader: ObjectId,    // ref: User
  category: String,      // enum of 10 categories
  views: Number,
  likes: [ObjectId],     // array of user IDs
  dislikes: [ObjectId]   // array of user IDs
}
```

### Channel
```js
{
  channelName: String,
  owner: ObjectId,       // ref: User
  description: String,
  channelBanner: String,
  subscribers: Number,
  videos: [ObjectId]     // ref: Video
}
```

### Comment
```js
{
  text: String,
  videoId: ObjectId,   // ref: Video
  userId: ObjectId     // ref: User
}
```

---

## 🔒 Security Features

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- **JWT tokens** expire in 7 days
- Protected routes verified via middleware on every request
- Users can only edit/delete **their own** videos and comments
- Channel creation limited to **one channel per user**

---

## 📦 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend
No `.env` required. The API base URL is set in `src/api/axios.js`:
```js
baseURL: 'http://localhost:5000/api'
```

---

## 🧪 Testing the API (Postman)

Import this base URL: `http://localhost:5000/api`

**Test flow:**
1. `POST /api/auth/register` → create account
2. `POST /api/auth/login` → get token
3. Copy token → add to header: `Authorization: Bearer <token>`
4. `POST /api/channels` → create channel
5. `POST /api/videos` → add video with `channelId`
6. `GET /api/videos` → see all videos
7. `PUT /api/videos/:id/like` → like a video

---



## 🤝 Contributing

This is a capstone project. Feel free to fork and extend it with features like:
- Video upload (Cloudinary / AWS S3)
- Real-time notifications
- Subscription system
- Playlist management

---

## 📄 License

This project is for educational purposes as part of the MERN Stack Capstone Project.

---

## 👤 Author

**Your Name**  
📧 sufalthakre4@gmail.com  
🔗 [GitHub](https://github.com/Sufalthakre18)  

---

> ⭐ If you found this helpful, please star the repository!