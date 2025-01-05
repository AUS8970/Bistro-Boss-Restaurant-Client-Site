import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn =() => {
    googleSignIn()
    .then(res => {
      console.log(res.user)
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res.data);
        navigate('/');
      });
    });
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle />
          Continue With Google
        </button>
      </div>
      <div className="divider">OR</div>
    </div>
  );
};

export default SocialLogin;