/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const PublicLayout = () => {
  const navigate = useNavigate();
  const handlePublic = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      return navigate('/');
    } else {
      return navigate('/login');
    }
  };

  useEffect(() => {
    handlePublic();
  }, []);
  return <Outlet />;
};

export default PublicLayout;
