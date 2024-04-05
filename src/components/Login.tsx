import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../components/Login.scss"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup } from "firebase/auth";
import btn_google_signin_dark_normal_web from './btn_google_signin_dark_normal_web@2x.png';
import { useAuth } from "../AuthContext";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBljAzxVq9jbcZ3A9DohPZTu54yfgTlcNk",
//   authDomain: "jobseekr-ca0de.firebaseapp.com",
//   projectId: "jobseekr-ca0de",
//   storageBucket: "jobseekr-ca0de.appspot.com",
//   messagingSenderId: "39266223549",
//   appId: "1:39266223549:web:8994521735439b606f3ed4",
//   measurementId: "G-LBP90201C5"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useAuth();

    const usenavigate = useNavigate();
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    
    // const logg = ()=>{
    //     signInWithPopup(auth, provider).then((result) => {
            
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         console.log("aaaa",user);
    //         fetch("http://localhost:8000/user/").then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             console.log(resp)
    //             const userPresent = resp.filter((e)=>{
    //                     return e.username == user.displayName;
    //             }).length>0;
    //                 if (userPresent) {
    //                     toast.success('Success');
    //                     sessionStorage.setItem('username',resp.username);
    //                     sessionStorage.setItem('userrole',resp.role);
    //                     usenavigate('/')
    //                 }else{
    //                     let regobj = 
    //                     {
    //                         "id": user.displayName,
    //                         "name": user.displayName,
    //                         "password": "",
    //                         "email": user.email,
    //                         "phone": user.phoneNumber,
    //                         "country": "",
    //                         "address": "",
    //                         "gender": "",
    //                         "role": "candidate"
    //                       };
    //                     //console.log(regobj);
    //                     fetch("http://localhost:8000/user", {
    //                         method: "POST",
    //                         headers: { 'content-type': 'application/json' },
    //                         body: JSON.stringify(regobj)
    //                     }).then((res) => {
    //                         toast.success('Success');
    //                         sessionStorage.setItem('username',user.displayName);
    //                         sessionStorage.setItem('userrole',"candidate");
    //                         usenavigate('/')
    //                     }).catch((err) => {
    //                         toast.error('Failed :' + err.message);
    //                     });
    //                 }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //       }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //       });
    // }
//     useEffect(()=>{
// sessionStorage.clear();
//     },[]);
    
const validate = () => {
    let result = true;
    if (username === '' || username === null) {
        result = false;
        toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning('Please Enter Password');
    }
    return result;
}

const ProceedLogin = async() => {
    //e.preventDefault();
    // retrieveTodos().then((res)=>{
    //     if(res && res.data)
    //     console.log(res.data);
    // })
    // if (await authContext.login(username, password)) {
    //     console.log("hello");
    //     toast.success('Success');
    //     usenavigate("/todos")
    // }
    // else{
    //     console.log("failed");
        
    // }
}

    // const ProceedLoginusingAPI = () => {
    //     e.preventDefault();
    //     if (validate()) {
    //         ///implentation
    //         // console.log('proceed');
    //         let inputobj={"username": username,
    //         "password": password};
    //         fetch("https://localhost:44308/User/Authenticate",{
    //             method:'POST',
    //             headers:{'content-type':'application/json'},
    //             body:JSON.stringify(inputobj)
    //         }).then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             console.log(resp)
    //             if (Object.keys(resp).length === 0) {
    //                 toast.error('Login failed, invalid credentials');
    //             }else{
    //                  toast.success('Success');
    //                  sessionStorage.setItem('username',username);
    //                  sessionStorage.setItem('jwttoken',resp.jwtToken);
    //                usenavigate('/')
    //             }
    //             // if (Object.keys(resp).length === 0) {
    //             //     toast.error('Please Enter valid username');
    //             // } else {
    //             //     if (resp.password === password) {
    //             //         toast.success('Success');
    //             //         sessionStorage.setItem('username',username);
    //             //         usenavigate('/')
    //             //     }else{
    //             //         toast.error('Please Enter valid credentials');
    //             //     }
    //             // }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });
    //     }
    // }


    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px', height: '100vh' }}>
                <form className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div onClick={ProceedLogin} className="btn btn-primary" style={{ marginRight: '15px' }}>Login</div> 
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                            {/* <div style={{ marginLeft: '15%' }}> or </div>
                            <div onClick={logg} >
                            <img src={btn_google_signin_dark_normal_web} alt="login with google" style={{ height: '50px' }}/>
                            </div> */}

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;