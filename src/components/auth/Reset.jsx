import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from '../loader/Loader';

const Reset = () => {
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reset_password = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    sendPasswordResetEmail(auth, email)

    .then(() => {
      setIsLoading(false);
      toast.success('Check your email');
    })
    .catch((error) => {
      setIsLoading(false);
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
                <h2>Reset Password</h2>

                <form onSubmit={reset_password}>
                    <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type='submit' className='btn_auth'>Reset Password</button>

                    <div className='links'>
                        <p><Link to='/auth'>Sign in</Link></p>
                        <p><Link to='/register'>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
      </>
  );
}

export default Reset;
