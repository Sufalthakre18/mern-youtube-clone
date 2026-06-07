import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  HiMenu,
  HiSearch,
  HiMicrophone,
  HiPlus,
} from 'react-icons/hi';

import { IoNotificationsOutline } from 'react-icons/io5';

const Header = ({ onToggleSidebar, onSearch }) => {
  const { user } = useAuth();

  const [query, setQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-200">
      {/* MOBILE SEARCH MODE */}
      {mobileSearch ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full"
        >
          <button
            type="button"
            onClick={() => setMobileSearch(false)}
            className="text-xl"
          >
            ←
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 h-10 border rounded-full px-4 outline-none"
          />
        </form>
      ) : (
        <>
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <HiMenu className="text-2xl" />
            </button>

            <Link to="/" className="flex items-center">
              <img
                src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
                alt="youtube"
                className="h-5"
              />
            </Link>
          </div>

          {/* CENTER */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex flex-1 justify-center px-8"
          >
            <div className="flex w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 h-10 px-4 border border-gray-300 rounded-l-full outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-16 border border-l-0 border-gray-300 rounded-r-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center"
              >
                <HiSearch className="text-xl" />
              </button>
            </div>

            <button
              type="button"
              className="ml-3 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <HiMicrophone className="text-xl" />
            </button>
          </form>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search */}
            <button
              onClick={() => setMobileSearch(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <HiSearch className="text-xl" />
            </button>

            {user ? (
              <>
                {/* Create */}
                <button className="hidden lg:flex items-center gap-1 px-3 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                  <HiPlus />
                  Create
                </button>

                {/* Bell */}
                <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100">
                  <IoNotificationsOutline className="text-2xl" />
                </button>

                {/* Avatar */}
                <Link to="/channel">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="border border-blue-500 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;