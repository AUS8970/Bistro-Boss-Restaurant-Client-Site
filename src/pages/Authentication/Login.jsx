import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {

  const [disabled, setDisabled] = useState(true);
  const {logIn} = useAuth();

  // navigate 
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    const form =  e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    logIn(email, password)
      .then(res => {
        const user = res.user;
        console.log(user);
        Swal.fire({
          title: "Login Successeful!",
          icon: "success",
          draggable: true
        });
        navigate(from, {replace: true});
      })
  };

  // aA!1df

  const handleValidateCaptcha = e => {
    const user_captcha_value = e.target.value;
    if(validateCaptcha(user_captcha_value) ){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-96 mx-auto my-10 shrink-0 shadow-2xl">
      <Helmet> <title> Bistro Boss | Login </title> </Helmet>
      <div className="card-body">
        <h2 className="text-2xl font-semibold text-center mb-3"> Log In </h2>
        <SocialLogin />
        <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Password </span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the text captcha above " className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <input disabled={disabled} className="btn btn-primary" type="submit" value={"Login"} />
              </div>
        </form>
        <p className="text-center pb-6">
          <small>New Here?</small>
          <Link to={"/signup"}> Create an account </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;