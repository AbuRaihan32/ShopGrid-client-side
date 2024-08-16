import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { createUserWithEmailAndPass, updateUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const pass = from.password.value;
    const image = from.img.value;

    //! create user
    createUserWithEmailAndPass(email, pass)
      // const user = {email: email}
      .then(() => {
        // Save user info to database
        // axiosPublic.post("/user", userInfo).then((res) => {
        //   if (res.data.insertedId) {
        //     Swal.fire({
        //       title: "Registered!",
        //       text: "You have been Registered Successfully.",
        //       icon: "success",
        //     });

        //     updateUser(name, image).then(() => {});
        //     logOut().then(() => {
        //       navigate("/");
        //     });
        //   }
        // });
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

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form onSubmit={handleSubmit} className="card-body">
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
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
