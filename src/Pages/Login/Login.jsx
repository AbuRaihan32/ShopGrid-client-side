import React from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signInWithEmail, googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const pass = from.password.value;

    //! sign in user
    signInWithEmail(email, pass)
      // const user = {email: email}
      .then(() => {
        Swal.fire({
          title: "Logged In!",
          text: "You have been Logged in.",
          icon: "success",
        });
        navigate(location?.state ? location?.state : "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  // !google Login
  const googleBtnHandle = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Logged In!",
          text: "You have been Logged in.",
          icon: "success",
        });
        navigate(location?.state ? location?.state : "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>ShopGrid || login</title>
      </Helmet>
      <div className="card card-body bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center">LOGIN</h1>
        <p className="font-bold text-center">
          Inter Your Information For Login
        </p>
        <form onSubmit={handleSubmit} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className=" btn bg-blue-800 text-white hover:bg-blue-900">Login</button>
          </div>
        </form>

        <div className="flex items-center pt-2 px-2 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm ">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={googleBtnHandle}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <FaGoogle></FaGoogle>
          </button>
          <button
            // onClick={facebookBtnHandle}
            aria-label="Log in with Twitter"
            className="p-3 rounded-sm"
          >
            <FaFacebook></FaFacebook>
          </button>
        </div>

        {/* navigator */}
        <p className="text-[16]  text-center sm:px-6 ">
          Do Not have an account?
          <Link
            to={"/register"}
            rel="noopener noreferrer"
            href="#"
            className="underline text-blue-600"
          >
            {" "}
            Register{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
