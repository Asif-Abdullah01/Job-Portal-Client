import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                console.log(res);
            })
            .then(err => {
                console.log(err.message);
            })
    }

    return (
        <div className="m-4">
            <div className="divider">OR</div>
            <div className="flex justify-center">
            <button onClick={handleGoogleSignIn} className='btn btn-primary text-white'>Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;