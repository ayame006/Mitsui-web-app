import React, { useEffect, useState } from 'react';
import './Header.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgMenuRightAlt } from 'react-icons/cg';
import { GrClose } from 'react-icons/gr';
import { auth } from '../../firebase/config';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';
import { AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { SET_ACTION_USER, REMOVE_ACTIVE_USER } from '../../redux/slices/authSlice';
import HiddenLinks, { ShowOnLogout } from '../hiddenLinks/HiddenLinks';

const activeLink = ({ isActive }) => (isActive ? 'active' : '');

const Header = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)

        if(user.displayName === null){
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        }else{
          setDisplayName(user.displayName);
        };

        setDisplayName(user.displayName);

        dispatch(SET_ACTION_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,

        }));
      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER())
      };
    });
  }, [dispatch, displayName]);
  
  const toggle_menu = () => {
    setShowMenu(!showMenu)
  };

  const hide_menu = () => {
    setShowMenu(false)
  };
  
  const logout_user = () => {
    signOut(auth).then(() => {
      toast.success('Logout successfully');
      navigate('/');
    }).catch((error) => {
      toast.error(error.message);
    });
  };
  
  return (
    <header>
        <div className='header'>
            <div className='logo'>
                <Link to='/'><h2>Mitsui</h2></Link>
            </div>

            <nav className={showMenu ? 'show_nav' : 'hide_menu'}>
               <div className={showMenu ? 'nav_wrapper show_nav_wrapper' : 'nav_wrapper'} onClick={hide_menu}></div>

                  <ul onClick={hide_menu}>
                      <li className='logo_mobile'>
                        <Link to='/'><h2>Mitsui</h2></Link>
                        <a className='close'><GrClose size={20} color='#fff' onClick={hide_menu} /></a>
                      </li>
                      <li><NavLink to='/' className={activeLink}>Home</NavLink></li>
                  </ul>
                  
                  <div className='right_bar' onClick={hide_menu}>
                    <div className='nav_links'>
                        <ShowOnLogout>
                            <NavLink to='/auth' className={activeLink}>Login</NavLink>
                        </ShowOnLogout>
                        <HiddenLinks>
                            <a href='#'><AiOutlineUser size={20} />{displayName}</a>
                        </HiddenLinks>
                        <NavLink to='/register' className={activeLink}>Register</NavLink>
                        <HiddenLinks>
                            <NavLink to='/' onClick={logout_user}>Logout</NavLink>
                        </HiddenLinks>
                    </div>
                </div>
            </nav>
          
            <div className='menu'>
                <CgMenuRightAlt size={25} onClick={toggle_menu} color='#fff' />
            </div>
        </div>
    </header>
  );
}

export default Header;
