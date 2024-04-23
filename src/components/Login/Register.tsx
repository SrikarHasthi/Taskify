import { KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/logo2.png";
import signInBg from "../../assets/signinbg.svg";
import "./Login.scss"
import { registerUser } from "../../api/apis";
import { RegisterUserData } from "../../Interfaces";
import CustomLoader from "../CustomLoader";

const Register = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const isValidate = () => {
        let isproceed = true;
        let errormessage = 'Please Enter ';
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            handlesubmit();
        }
    }


    const handlesubmit = () => {
        if (isValidate()) {
            setIsLoading(true);
            const payload: RegisterUserData = { name, password, email }
            registerUser(payload).then((res) => {
                console.log(res && res.data);
                toast.success('Registered successfully. Redirecting To Login..')
                setTimeout(() => {
                    navigate('/taskify')
                    setIsLoading(false);
                }, 3000)
            }).catch((err) => {
                setIsLoading(false);
                toast.error('Failed :' + err.message);
            })
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
                        <h2>Sign Up</h2>
                    </div>
                    <div className="login-body-container">
                        <div className="login-input-container">
                            <label>Username</label>
                            <input value={name} onChange={e => setName(e.target.value)} onKeyDown={(e) => { handleKeyDown(e) }} className="login-input" maxLength={20}></input>
                        </div>
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
                        <div onClick={handlesubmit} className="login-button">
                            {!isLoading ?
                                "Create"
                                : <CustomLoader />
                            }
                        </div>
                        <Link to={'/taskify'} className="sign-back-in"><span>&#8592;</span>Back to Login</Link>
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

export default Register;