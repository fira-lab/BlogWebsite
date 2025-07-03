import React from 'react'
import { useDispatch } from 'react-redux'
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Verify = () => {
  const dispatch = useDispatch();
  const {verificationToken} = useParams();

  const VerifyAccount = async () =>{

    await dispatch(verifyUser(verificationToken))
    toast.success("Account Verified Successfully!")
    await dispatch(RESET())
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white">
      <ToastContainer />
      <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Account Verification</h2>
        <p className="text-lg mb-6">To verify your account, click the button below</p>
        <button
          onClick={VerifyAccount}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Verify Account
        </button>
      </div>
    </section>
  )
}

export default Verify
