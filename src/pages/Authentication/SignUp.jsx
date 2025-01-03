import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {

  // react-hook-form
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  const handleSignup = data => {
    console.log(data);
    createUser(data.email, data.password)
    .then(res => {
      const loggedUser = res.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
      .then(() => {
        console.log('data updated')
        reset();
        Swal.fire({
          title: "Sign Up Successeful!",
          icon: "success",
          draggable: true
        });
        navigate('/');
      }) 
      .catch(err => console.log(err))
    })
  }

  return (
    <div>
      <Helmet> <title> Bistro Boss | Sign Up </title> </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(handleSignup)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Name </span>
                </label>
                <input {...register("name", {required: true})}  type="text" name="name" placeholder="name" className="input input-bordered"  />
                {errors.name && <span className="text-red-500 ml-2 mt-1"> Name is required </span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Photo URL </span>
                </label>
                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-600"> Photo URL is required</span>}
                {/* <input {...register("photoURL", {required: true})}  type="url" name="photoURL" placeholder="photo url" className="input input-bordered"  />
                {errors.photoURL && <span className="text-red-500 ml-2 mt-1"> Photo URL is required </span>} */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register("email", {required: true})} type="email" name="email" placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-500 ml-2 mt-1"> Email is required </span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Password </span>
                </label>
                <input {...register("password", {
                  required: true, 
                  minLength: 6, 
                  maxLength: 15,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                })} type="password" name="password" placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <span className="text-red-500 ml-2 mt-1"> Password is required. </span>}
                {errors.password?.type === 'minLength' && <span className="text-red-500 ml-2 mt-1"> The password must be at least 6 characters long. </span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-500 ml-2 mt-1"> The password should not exceed 15 characters. </span>}
                {errors.password?.type === 'pattern' && <span className="text-red-500 ml-2 mt-1"> Password must have one uppercase, one lower case, one number and one spacial characters. </span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value={"Sign Up"} />
              </div>
            </form>
            <p className="text-center pb-6">
              <small>Already have a account?</small>
              <Link to={"/login"}> Login </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;