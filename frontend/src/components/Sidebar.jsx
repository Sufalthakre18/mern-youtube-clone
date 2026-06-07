import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

import {
  HiOutlineHome,
  HiOutlineFire,
  HiOutlineShoppingBag,
  HiOutlineFilm,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineThumbUp,
} from 'react-icons/hi';

import { MdOutlineMusicNote } from 'react-icons/md';
import { FaGamepad } from 'react-icons/fa';
import { HiOutlineNewspaper } from 'react-icons/hi2';

const SidebarLink = ({
  icon: Icon,
  label,
  to,
  collapsed,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center rounded-xl hover:bg-gray-100 transition-all duration-200 text-gray-800
      ${
        collapsed
          ? 'flex-col justify-center gap-1 py-4 text-[10px]'
          : 'gap-5 px-3 py-2 text-sm font-medium'
      }`}
    >
      <Icon className="w-6 h-6 shrink-0" />

      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed
          top-14
          left-0
          h-[calc(100vh-56px)]
          bg-white
          overflow-y-auto
          z-40
          transition-all
          duration-300
          
          md:translate-x-0
          
          ${
            isOpen
              ? 'translate-x-0 w-60'
              : '-translate-x-full md:w-20'
          }
        `}
      >
        <div className="py-3 px-2">
          {/* Main Menu */}

          <SidebarLink
            icon={HiOutlineHome}
            label="Home"
            to="/"
            collapsed={!isOpen}
          />

          <SidebarLink
            icon={HiOutlineFire}
            label="Trending"
            to="/?category=Trending"
            collapsed={!isOpen}
          />

          <SidebarLink
            icon={HiOutlineShoppingBag}
            label="Shopping"
            to="#"
            collapsed={!isOpen}
          />

          <SidebarLink
            icon={MdOutlineMusicNote}
            label="Music"
            to="/?category=Music"
            collapsed={!isOpen}
          />

          <SidebarLink
            icon={HiOutlineFilm}
            label="Movies"
            to="#"
            collapsed={!isOpen}
          />

          <SidebarLink
            icon={FaGamepad}
            label="Gaming"
            to="/?category=Gaming"
            collapsed={!isOpen}
          />

          <SidebarLink
            icon={HiOutlineNewspaper}
            label="News"
            to="#"
            collapsed={!isOpen}
          />

          {isOpen && (
            <>
              <div className="border-t my-3" />

              {user ? (
                <>
                  <p className="px-3 py-2 text-sm font-semibold">
                    You
                  </p>

                  <SidebarLink
                    icon={HiOutlineUser}
                    label="Your Channel"
                    to="/channel"
                    collapsed={false}
                  />

                  <SidebarLink
                    icon={HiOutlineClock}
                    label="History"
                    to="#"
                    collapsed={false}
                  />

                  <SidebarLink
                    icon={HiOutlineThumbUp}
                    label="Liked Videos"
                    to="#"
                    collapsed={false}
                  />
                </>
              ) : (
                <div className="px-3 py-3">
                  <p className="text-sm text-gray-600 mb-3">
                    Sign in to like videos, comment,
                    and subscribe.
                  </p>

                  <Link
                    to="/login"
                    className="flex items-center gap-2 border border-blue-500 text-blue-600 rounded-full px-3 py-2 text-sm hover:bg-blue-50 w-fit"
                  >
                    <HiOutlineUser className="w-4 h-4" />
                    Sign in
                  </Link>
                </div>
              )}

              <div className="border-t my-3" />

              <p className="px-3 py-2 text-sm font-semibold">
                Explore
              </p>

              <SidebarLink
                icon={FaGamepad}
                label="Gaming"
                to="/?category=Gaming"
                collapsed={false}
              />

              <SidebarLink
                icon={MdOutlineMusicNote}
                label="Music"
                to="/?category=Music"
                collapsed={false}
              />

              <SidebarLink
                icon={HiOutlineNewspaper}
                label="News"
                to="#"
                collapsed={false}
              />
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;