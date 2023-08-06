import React, { useState } from 'react';
import './Auth.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';

const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const auth_user = (e) => {
        e.preventDefault();

        setIsLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            // const user = userCredential.user;
            setIsLoading(false);
            toast.success('Login successful');
            navigate('/');
        })
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
        });

        setEmail('');
        setPassword('');
    }

    const provider = new GoogleAuthProvider();

    const signIn_google = () => {
        signInWithPopup(auth, provider)

        .then((result) => {
            // const user = result.user;
            toast.success('Login succsessfully');
            navigate('/');
        }).catch((error) => {
            toast.error(error.message);
        });
    };
    
    return (
        <>
            {
                isLoading && <Loader />
            }
            <div className='auth'>
                <div className='form'>
                    <h2>Sign in</h2>

                    <form onSubmit={auth_user}>
                        <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit' className='btn_auth'>Sign in</button>

                        <div className='links'>
                            <Link to='/reset'>Forgot Password</Link>
                        </div>
                        
                        <p>─── or ───</p>
                        <button className='btn_auth' onClick={signIn_google}>Sign in with Google</button>

                        <div className='register'>
                            <p>Don't have an account?</p>
                            <Link to='/register'>Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Auth;
