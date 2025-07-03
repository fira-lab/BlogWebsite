import React, { useEffect } from 'react'
import { FaUsers } from "react-icons/fa";
import { BiUserCheck } from "react-icons/bi";
import { BiUserMinus } from "react-icons/bi";
import { BiUserX } from "react-icons/bi";
import Infobox from '../infoBox/Infobox';
import './UserStats.css';
import { useDispatch, useSelector } from "react-redux";
import { CALC_SUSPENDED_USER, CALC_VERIFIED_USER } from '../../redux/features/auth/authSlice';


const icon1 = <FaUsers size={40} color='#fff'/> ;
const icon2 = <BiUserCheck size={40} color='#fff'/> ;
const icon3 = <BiUserMinus size={40} color='#fff'/> ;
const icon4 = <BiUserX size={40} color='#fff'/> ;

const UserStats = () => {
  const dispatch = useDispatch();

  const { users, verifiedUsers, suspendedUsers } = useSelector ((state) => state.auth);
  useEffect(() =>{
    dispatch(CALC_SUSPENDED_USER())
    dispatch(CALC_VERIFIED_USER())
  }, [dispatch, users]);

  const unverifiedUsers = users.length- verifiedUsers;

  return (
    <div className='user-summary'>
        <h3 className='--mt'> User Stats</h3>
        <div className='info-summay'>
            <Infobox icon={icon1} title={"Total Users"} count={users.length} bgColor={"card3"} />

            <Infobox icon={icon2} title={"Verified Users"} count={verifiedUsers} bgColor={"card2"} />
   
            <Infobox icon={icon3} title={"Unverified Users"} count={unverifiedUsers} bgColor={"card4"} />

            <Infobox icon={icon4} title={"Suspended Users"} count={suspendedUsers} bgColor={"card1"} />
   
         
        </div>
      
    </div>
  )
}

export default UserStats;
