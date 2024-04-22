import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo2.png";
import signInBg from "../../assets/signinbg.svg";
import "./Login.scss"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../AuthContext";
import CustomLoader from "../CustomLoader";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useAuth();

    const usenavigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, [])
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Email');
            return;
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    const proceedLogin = async () => {
        if (validate()) {
            setIsLoading(true);
            if (await authContext.login(email, password)) {
                setIsLoading(false);
                toast.success('Success');
                usenavigate("/taskify/home");
            }
            else {
                toast.error('Wrong Email or Password');
            }
        }
        else {
            console.log("failed");
        }
        setIsLoading(false);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            proceedLogin();
        }
    }

    return (
        <div className="login-page-container">
            <div className="login-main-container">
                <div className="login-main-body-container">
                    <div className="login-logo-container">
                        <div className="login-logo-image">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="login-logo-name">Taskify</div>
                    </div>
                    <div className="login-signin-container">
                        <h2>Sign In</h2>
                    </div>
                    <div className="login-body-container">
                        <div className="login-input-container">
                            <label>Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={(e) => { handleKeyDown(e) }} className="login-input" maxLength={30}></input>
                        </div>
                        <div className="login-input-container">
                            <label>Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={(e) => { handleKeyDown(e) }} className="login-input" maxLength={20}></input>
                        </div>
                    </div>
                    <div className="login-footer-container">
                        <div onClick={proceedLogin} className="login-button">
                            {!isLoading ?
                                "Login"
                                : <CustomLoader />
                            }
                        </div>
                        <div className="sign-up">Don't have an account?<Link to={'/taskify/register'}><span>Create Now</span></Link></div>
                    </div>
                </div>
            </div>
            <div className="login-bg-image">
                <img src={signInBg} alt="bg" />
            </div>
            <ToastContainer
                position="bottom-right"
                hideProgressBar={true}
            />
        </div>
    );
}

export default Login;