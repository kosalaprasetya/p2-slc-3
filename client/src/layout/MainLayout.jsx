/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import logo from '../assets/hacktiv-esport.png';

const MainLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    return navigate('/login');
  };
  const handleAuthentication = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return navigate('/login');
    }
  };

  useEffect(() => {
    handleAuthentication();
  }, []);
  return (
    <>
      <nav className="navbar sticky top-0 z-10 p-3 bg-base-300 shadow">
        <div className="navbar-start">
          <Link
            className="text-2xl font-bold px-6"
            to={'/'}
          >
            <img
              src={logo}
              className="w-1/2"
            />
          </Link>
        </div>
        <div className="navbar-end"></div>
        <div className="navbar-end">
          <Link
            className="btn btn-accent btn-sm mx-1"
            to={'/add'}
          >
            Add Game
          </Link>
          <Link
            className="btn btn-neutral btn-sm mx-1"
            to={'/login'}
          >
            Login
          </Link>
          <button
            className="btn btn-error btn-sm mx-1"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MainLayout;
