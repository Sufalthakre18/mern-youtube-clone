import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineMicrophone,
  HiOutlineVideoCamera,
  HiBell,
  HiOutlineUser,
} from 'react-icons/hi';

const Header = ({ onToggleSidebar, onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-4 py-2 h-14 shadow-sm">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4 min-w-[180px]">
        <button
  onClick={onToggleSidebar}
  className="p-2 rounded-full hover:bg-gray-100"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>
        <Link to="/" className="flex items-center gap-1 select-none">
          <svg viewBox="0 0 90 20" className="h-5 w-auto" aria-label="YouTube">
            <g>
              <path
                d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                fill="#FF0000"
              />
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
            </g>
            <g>
              <path
                d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3467 6.46592C35.6422 7.67768 35.8624 8.72741 36.0074 9.61508H36.0862C36.1935 8.99252 36.4163 7.94529 36.7563 6.46592L37.9586 1.41846H40.7573L37.5011 13.0036V18.561H34.6001V13.0036H34.6024Z"
                fill="#282828"
              />
              <path
                d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.96113 40.3152 8.14856C40.5905 7.33606 41.0252 6.73847 41.6271 6.35742C42.2291 5.97632 43.0382 5.78577 44.0551 5.78577C45.0462 5.78577 45.8436 5.97404 46.4272 6.35742C47.0108 6.7408 47.4305 7.33606 47.6937 8.14856C47.9568 8.96113 48.0884 10.0422 48.0884 11.3898V13.2078C48.0884 14.5437 47.9626 15.6161 47.7062 16.4157C47.4497 17.2217 47.0424 17.8151 46.4853 18.1937C45.9258 18.5723 45.1157 18.7628 44.0551 18.7628C42.9739 18.7628 42.1646 18.5723 41.4697 18.1937ZM44.8352 16.2323C45.0322 15.8628 45.1319 15.2574 45.1319 14.4157V10.1489C45.1319 9.33635 45.0322 8.73875 44.8352 8.36001C44.6381 7.98126 44.3334 7.79071 43.9265 7.79071C43.5338 7.79071 43.2386 7.98126 43.0485 8.36001C42.8583 8.73875 42.7633 9.33635 42.7633 10.1489V14.4157C42.7633 15.2574 42.8559 15.8628 43.0414 16.2323C43.2268 16.6019 43.5245 16.7889 43.9265 16.7889C44.3334 16.7889 44.6381 16.6019 44.8352 16.2323Z"
                fill="#282828"
              />
              <path
                d="M55.2952 18.5614H52.8723L52.6004 17.0022H52.5334C51.7749 18.1757 50.7355 18.7613 49.4143 18.7613C48.4654 18.7613 47.7664 18.4324 47.319 17.7822C46.8715 17.1178 46.6455 16.1156 46.6455 14.7702V5.93588H49.5657V14.6181C49.5657 15.2979 49.6302 15.7869 49.7589 16.0846C49.8877 16.3823 50.1206 16.5314 50.4696 16.5314C50.7655 16.5314 51.0422 16.4408 51.3011 16.2606C51.5575 16.0798 51.7467 15.8545 51.8674 15.5779V5.93588H55.2952V18.5614Z"
                fill="#282828"
              />
              <path
                d="M64.4037 3.68758H61.4732V18.5614H58.6227V3.68758H55.6922V1.41846H64.4037V3.68758Z"
                fill="#282828"
              />
              <path
                d="M71.2052 18.5614H68.7822L68.5103 17.0022H68.4434C67.6849 18.1757 66.6455 18.7613 65.3242 18.7613C64.3753 18.7613 63.6763 18.4324 63.2289 17.7822C62.7815 17.1178 62.5554 16.1156 62.5554 14.7702V5.93588H65.4757V14.6181C65.4757 15.2979 65.5401 15.7869 65.6689 16.0846C65.7977 16.3823 66.0306 16.5314 66.3796 16.5314C66.6754 16.5314 66.9522 16.4408 67.211 16.2606C67.4675 16.0798 67.6566 15.8545 67.7774 15.5779V5.93588H71.2052V18.5614Z"
                fill="#282828"
              />
              <path
                d="M80.609 8.0387C80.4419 7.26727 80.1621 6.70973 79.7719 6.36768C79.3818 6.02559 78.8466 5.85454 78.1671 5.85454C77.6319 5.85454 77.1339 6.00834 76.6769 6.31592C76.2199 6.62351 75.8627 7.02955 75.6055 7.53406H75.5877V0.785645H72.7372V18.5614H75.3026L75.5432 17.3388H75.6055C75.8399 17.7939 76.1873 18.157 76.6477 18.4273C77.1104 18.6977 77.6247 18.8329 78.1955 18.8329C79.1702 18.8329 79.8949 18.3975 80.3779 17.5293C80.8608 16.6611 81.1023 15.3263 81.1023 13.5208V11.0977C81.1023 9.69281 80.9382 8.80993 80.609 8.0387ZM78.2172 13.3934C78.2172 14.2809 78.1671 14.9564 78.0677 15.4145C77.9683 15.8726 77.8142 16.2017 77.6104 16.4014C77.4067 16.6011 77.1506 16.7003 76.8392 16.7003C76.5841 16.7003 76.3457 16.6387 76.1239 16.5133C75.9021 16.3879 75.7229 16.2017 75.5877 15.9547V8.64997C75.7106 8.25432 75.9092 7.93127 76.1872 7.68082C76.4653 7.43037 76.7685 7.30514 77.0968 7.30514C77.4067 7.30514 77.6485 7.40638 77.8178 7.60663C77.9871 7.80688 78.1123 8.14464 78.1910 8.62287C78.2697 9.10113 78.3103 9.78278 78.3103 10.6678V13.3934H78.2172Z"
                fill="#282828"
              />
              <path
                d="M84.8657 13.8712C84.8657 14.6768 84.9008 15.2636 84.9709 15.6317C85.0409 16.0022 85.1745 16.2663 85.3717 16.4268C85.5688 16.5873 85.8591 16.6664 86.2426 16.6664C86.7568 16.6664 87.1259 16.4627 87.3544 16.0576C87.5829 15.6501 87.7019 14.9915 87.7094 14.0797L90.0875 14.2081C90.1003 14.3435 90.1066 14.5437 90.1066 14.8064C90.1066 15.9959 89.7835 16.9021 89.1372 17.5317C88.491 18.1613 87.5796 18.4761 86.4032 18.4761C84.9499 18.4761 83.9336 18.0051 83.3541 17.0605C82.7747 16.1159 82.4849 14.6284 82.4849 12.5988V10.3977C82.4849 8.30216 82.7898 6.78338 83.3997 5.83815C84.0095 4.89293 85.0301 4.42032 86.4032 4.42032C87.3447 4.42032 88.0852 4.61781 88.6245 5.01278C89.1638 5.40776 89.5468 6.03376 89.7734 6.88073C90.0 7.72771 90.1133 8.87625 90.1133 10.3258V12.5454H84.8657V13.8712ZM85.3564 7.64565C85.1661 8.00611 85.0409 8.58774 84.9811 9.39074H87.2883C87.2364 8.60247 87.1116 8.02321 86.914 7.64565C86.7163 7.27043 86.4032 7.08282 85.9758 7.08282C85.5363 7.08282 85.2396 7.27043 85.0409 7.64565H85.3564Z"
                fill="#282828"
              />
            </g>
          </svg>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-2xl mx-4">
        <div className="flex flex-1 border border-gray-300 rounded-l-full overflow-hidden focus-within:border-blue-500">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 px-4 py-2 text-sm outline-none bg-white"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 transition-colors"
        >
          <HiOutlineSearch className="w-5 h-5 text-gray-600" />
        </button>
        <button
          type="button"
          className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <HiOutlineMicrophone className="w-5 h-5" />
        </button>
      </form>

      {/* Right: User Actions */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <button className="p-2 rounded-full hover:bg-gray-100 hidden md:flex">
              <HiOutlineVideoCamera className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 hidden md:flex">
              <HiBell className="w-6 h-6" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 ml-2"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold text-sm uppercase overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    user.username?.[0]
                  )}
                </div>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/channel"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    <HiOutlineUser className="w-4 h-4" />
                    Your Channel
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 border border-blue-500 text-blue-600 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <HiOutlineUser className="w-5 h-5" />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;