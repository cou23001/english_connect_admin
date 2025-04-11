import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Logout from './Logout';
import { useAuth } from '../context/authContext';

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  const renderMenuForRole = () => {
    if (!user) return null;

    switch (user.type) {
      case 10:
        return (
          <>
            <li><Link to="/attendance" onClick={closeNavHandler}>Attendance</Link></li>
            <li><Link to="/users" onClick={closeNavHandler}>Users</Link></li>
            <li><Link to="/students" onClick={closeNavHandler}>Students</Link></li>
            <li><Link to="/instructors" onClick={closeNavHandler}>Instructors</Link></li>
            <li><Link to="/groups" onClick={closeNavHandler}>Groups</Link></li>
            <li><Link to="/stakes" onClick={closeNavHandler}>Stakes</Link></li>
            <li><Link to="/units" onClick={closeNavHandler}>Wards & Branches</Link></li>
            <li><Link to="/statistics" onClick={closeNavHandler}>Statistics</Link></li>
          </>
        );
      case 11:
        return (
          <>
            <li><Link to="/attendance" onClick={closeNavHandler}>Attendance</Link></li>
            <li><Link to="/students" onClick={closeNavHandler}>My Students</Link></li>
            <li><Link to="/groups" onClick={closeNavHandler}>Groups</Link></li>
          </>
        );
      case 1:
        return (
          <>
            <li><Link to="/my-attendance" onClick={closeNavHandler}>My Attendance</Link></li>
            <li><Link to="/my-profile" onClick={closeNavHandler}>My Profile</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav>
      <div className='container nav__container'>
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
          <img src={Logo} alt='Navbar Logo' />
        </Link>
        {isNavShowing && (
          <ul className='nav__menu'>
            <li><Link to="/" onClick={closeNavHandler}>Home</Link></li>

            {isAuthenticated && renderMenuForRole()}

            {!isAuthenticated && (
              <>
                <li><Link to="/register" onClick={closeNavHandler}>Register</Link></li>
                <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
              </>
            )}

            {isAuthenticated && (
              <li><Logout onClick={closeNavHandler} /></li>
            )}
          </ul>
        )}
        <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
