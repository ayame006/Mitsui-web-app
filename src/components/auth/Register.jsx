import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const Register = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    
    const register_user = (e) => {
        e.preventDefault();

        if(password !== conPassword){
            toast.error('Password mismatch');
        }
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setIsLoading(false);
            toast.success('Sign up successful');
            navigate('/auth');
        })
        .catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
        });

        setEmail('');
        setPassword('');
        setConPassword('');
    };

    return (
        <>
            {
                isLoading && <Loader />
            }
                <div className='auth'>
                    <div className='form'>
                        <h2>Sign up</h2>

                        <form onSubmit={register_user}>
                            <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder='Confirm Password' required value={conPassword} onChange={(e) => setConPassword(e.target.value)} />
                            <button type='submit' className='btn_auth'>Sign up</button>

                            <div className='links'>
                                <Link to='/reset'>Forgot Password</Link>
                            </div>

                            <div className='register'>
                                <p>Already an account?</p>
                                <Link to='/auth'>Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default Register;
