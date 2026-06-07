import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import VideoCard from '../components/VideoCard.jsx';
import api from '../api/axios.js';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();

  // Handle category from URL param (sidebar links)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (activeCategory && activeCategory !== 'All') params.category = activeCategory;
      const res = await api.get('/videos', { params });
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveCategory('All');
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onSearch={handleSearch} />
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content - shifts right when sidebar is open on desktop */}
      <main
        className={`pt-14 transition-all duration-200 ${
          sidebarOpen ? 'md:ml-60' : 'md:ml-20'
        }`}
      >
        {/* Filter Bar */}
        <div className="sticky top-14 bg-white z-20 px-4 py-3 border-b border-gray-100">
          <FilterBar
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Video Grid */}
        <div className="px-4 py-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full aspect-video bg-gray-200 rounded-xl" />
                  <div className="flex gap-3 mt-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500">
              <svg className="w-20 h-20 mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
              <p className="text-lg font-medium">No videos found</p>
              <p className="text-sm">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;