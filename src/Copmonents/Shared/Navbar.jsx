import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const NavLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#2EE9B1] hover:bg-[#00247A] hover:text-white rounded-md py-[7px] px-3"
              : "py-[6px] px-3"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#2EE9B1] hover:bg-[#00247A] hover:text-white rounded-md py-[7px] px-3"
              : "py-[6px] px-3"
          }
          to={"/allTestForUser"}
        >
          All Tests
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar z-50 lg:pr-8 my-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu z-30 text-[#2EE9B1] menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavLinks}
            <li>
              <div className="">
                {user ? (
                  <button onClick={signOutBtnHandler} className="flex gap-3">
                    <BiLogOutCircle className="text-xl"></BiLogOutCircle> Sign
                    Out
                  </button>
                ) : (
                  <Link to={"/login"} className="flex gap-3">
                    <BiLogInCircle className="text-xl"></BiLogInCircle>Login
                  </Link>
                )}
              </div>
            </li>

            <li>
              <div className="">
                {user ? (
                  ""
                ) : (
                  <Link to={"/register"} className="flex gap-3">
                    <BiLogInCircle className="text-xl"></BiLogInCircle>Register
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
        <a href="/">
          <img className="h-[80px] overflow-hidden" src={logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 gap-2 items-center font-semibold">
          {NavLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {/* theme control */}
        <div className="mr-3">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        {user ? (
          <>
            <div className="relative">
              <div className="avatar mr-5 z-20 flex md:gap-4">
                <div
                  title={`${user.displayName}`}
                  className="w-10 rounded-full ring ring-[#2EE9B1] ring-offset-base-100 ring-offset-2"
                >
                  <img
                    src={
                      user?.photoURL ? user.photoURL : "/public/icons8-user.gif"
                    }
                  />
                </div>
              </div>
              <div className="absolute -top-[15px] right-[5px] z-10">
                <PuffLoader color="#2EE9B1" size={70}></PuffLoader>
              </div>
            </div>

            <Link
              to={"/login"}
              onClick={signOutBtnHandler}
              className="relative border border-[#2EE9B1] inline-flex items-center justify-start px-3 md:px-7 py-2 overflow-hidden font-medium transition-all rounded-full hover:bg-white group "
            >
              <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="flex items-center justify-center gap-2 relative text-center w-full text-[#2EE9B1] transition-colors duration-300 ease-in-out group-hover:text-white">
                {" "}
                <BiLogOutCircle className="text-xl"></BiLogOutCircle>{" "}
                <span className="hidden md:inline">Sign Out</span>
              </span>
            </Link>
          </>
        ) : (
          <div>
            <Link
              to={"/login"}
              className="relative border border-[#2EE9B1] inline-flex items-center justify-start px-7 py-2 overflow-hidden font-medium transition-all rounded-full hover:bg-white group mr-2"
            >
              <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="flex items-center justify-center gap-2 relative text-center w-full text-[#2EE9B1] transition-colors duration-300 ease-in-out group-hover:text-white">
                {" "}
                <BiLogInCircle className="text-xl"></BiLogInCircle>{" "}
                <span className="hidden md:inline">Sign In</span>
              </span>
            </Link>

            <Link
              to={"/register"}
              className="relative border border-[#2EE9B1]  items-center justify-start px-7 py-2 overflow-hidden font-medium transition-all rounded-full hover:bg-white group hidden md:inline-flex"
            >
              <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="flex items-center justify-center gap-2 relative text-center w-full text-[#2EE9B1] transition-colors duration-300 ease-in-out group-hover:text-white">
                {" "}
                <BiLogInCircle className="text-xl"></BiLogInCircle>{" "}
                <span className="">Sign Up</span>
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
