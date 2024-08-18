import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUserWithEmailAndPass, updateUser, logOut, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const pass = from.password.value;
    const image = from.img.value;

    //! create user
    createUserWithEmailAndPass(email, pass)
      .then(() => {
        updateUser(name, image).then(() => {});
        logOut().then(() => {
          navigate("/login");
        });
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
    <>
      <Helmet>
        <title>ShopGrid || Register</title>
      </Helmet>
      <div className="card card-body bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center">REGISTER</h1>
        <p className="font-bold text-center">
          Inter Your Information For Register
        </p>
        <form onSubmit={handleSubmit} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
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
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              name="img"
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
            <button className=" btn bg-blue-800 text-white hover:bg-blue-900">Register</button>
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
        <p className="text-[16] text-center sm:px-6 ">
          Already have an account?
          <Link
            to={"/login"}
            rel="noopener noreferrer"
            href="#"
            className="underline text-blue-600"
          >
            {" "}
            Login{" "}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
