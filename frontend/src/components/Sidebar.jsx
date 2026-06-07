import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  HiOutlineHome,
  HiOutlineFire,
  HiOutlineShoppingBag,
  HiOutlineMusicNote,
  HiOutlineFilm,
  HiOutlineDesktopComputer,
  HiOutlineNewspaper,
  HiOutlineCollection,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineThumbUp,
} from 'react-icons/hi';

const SidebarLink = ({ icon: Icon, label, to, onClick }) => (
  <Link
    to={to || '#'}
    onClick={onClick}
    className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium group"
  >
    <Icon className="w-6 h-6 text-gray-700 group-hover:text-gray-900 shrink-0" />
    <span className="text-gray-700 group-hover:text-gray-900">{label}</span>
  </Link>
);

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" />
      )}

      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-56px)] w-60 bg-white z-40 overflow-y-auto transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        <div className={`py-3 ${isOpen ? 'px-3' : 'px-1'}`}>
          {/* Main Nav */}
          <SidebarLink icon={HiOutlineHome} label="Home" to="/" />
          <SidebarLink icon={HiOutlineFire} label="Trending" to="/?category=Trending" />
          <SidebarLink icon={HiOutlineShoppingBag} label="Shopping" to="#" />
          <SidebarLink icon={HiOutlineMusicNote} label="Music" to="/?category=Music" />
          <SidebarLink icon={HiOutlineFilm} label="Movies" to="#" />
          <SidebarLink icon={HiOutlineDesktopComputer} label="Gaming" to="/?category=Gaming" />
          <SidebarLink icon={HiOutlineNewspaper} label="News" to="#" />

          <div className="border-t border-gray-200 my-3" />

          {/* Logged-in section */}
          {user ? (
            <>
              <p className="text-sm font-semibold px-3 py-2">You</p>
              <SidebarLink
                icon={HiOutlineUser}
                label="Your Channel"
                to="/channel"
              />
              <SidebarLink icon={HiOutlineClock} label="History" to="#" />
              <SidebarLink icon={HiOutlineThumbUp} label="Liked Videos" to="#" />
            </>
          ) : (
            <div className="px-3 py-3">
              <p className="text-sm text-gray-600 mb-3">
                Sign in to like videos, comment, and subscribe.
              </p>
              <Link
                to="/login"
                className="flex items-center gap-2 border border-blue-500 text-blue-600 rounded-full px-3 py-1.5 text-sm hover:bg-blue-50 w-fit"
              >
                <HiOutlineUser className="w-4 h-4" />
                Sign in
              </Link>
            </div>
          )}

          <div className="border-t border-gray-200 my-3" />

          {/* Explore */}
          <p className="text-sm font-semibold px-3 py-2">Explore</p>
          <SidebarLink icon={HiOutlineCollection} label="Gaming" to="/?category=Gaming" />
          <SidebarLink icon={HiOutlineMusicNote} label="Music" to="/?category=Music" />
          <SidebarLink icon={HiOutlineNewspaper} label="News" to="#" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;