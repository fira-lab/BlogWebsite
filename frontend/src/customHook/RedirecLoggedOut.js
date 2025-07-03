import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../redux/features/auth/authSevice';
import { toast } from 'react-toastify';

const RedirecLoggedOut = (path) => {
  const navigate = useNavigate();
  useEffect(() => {
    let isLoggedIn;
    const checkLoginStatus = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
        
      } catch (error) {
        console.log(error.message);
      }

      if (!isLoggedIn) {
        navigate(path);
        toast.info("Session Expired, Please login");
        navigate(path)
        return;
      }
    };

    checkLoginStatus();
  }, [path, navigate]);

 };

export default RedirecLoggedOut;