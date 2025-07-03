import React from 'react';
import { RESET, sendVerificationEmail } from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const Notification = () => {
    const dispatch = useDispatch();

    const sendVerEmail = async () => {
        await dispatch(sendVerificationEmail());
        toast.success("Email Sent!");
        await dispatch(RESET());
    }

    return (
        <div className=''>
            <ToastContainer/>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center'>
                <p className='text-lg font-semibold text-gray-800'>
                    <b>Message:</b> &nbsp;To verify your account, check your email for a verification link.
                </p>
                <p className='mt-4 text-blue-500 cursor-pointer hover:underline font-bold' onClick={sendVerEmail}>
                    Resend Link
                </p>
            </div>
        </div>
    )
}

export default Notification;
