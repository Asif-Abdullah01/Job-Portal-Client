import Lottie from "lottie-react";
import signInLottieData from '../../assets/Lottie/signIn.json'
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {


    const location = useLocation();
    const navigate = useNavigate();

    console.log(location);

    const from = location?.state || '/';

    const {signInUser} = useContext(AuthContext);

    const [errorMessage,setErrorMessage] = useState('');

    const handleSignIn = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email,password);

        setErrorMessage('');


        //password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(!passwordRegex.test(password)){
            setErrorMessage('Password must contain at least one uppercase letter, at least one number and at least 6 characters.')
            return;
        }


        //verification via firebase
        signInUser(email,password)
        .then(result => {
            console.log('sign in: ',result.user);
            navigate(from);
        })
        .catch(err => {
            console.log(err.message);
        })
        
    }

    return (
        <div className="hero bg-base-200 min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96 h-96">
                    <Lottie animationData={signInLottieData}></Lottie>
                </div>
                <div className="card pb-2 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>

                    </form>
                    <SocialLogin></SocialLogin>
                        {errorMessage && <p className="text-red-600 font-bold text-center">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default SignIn;