import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import emailService from './emailService';




const initialState = {
    sendingEmail:false,
    emailSent:false,
    msg: "",

}



export const sendAuto = createAsyncThunk(
    "email/autoEmail",
    async (userData, thunkAPI) => {
      try {
        return await emailService.sendAuto(userData);
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
      }
    }
  );

  const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
      EMAIL_RESET(state){
          state.sendingEmail = false;
      state.emailSent = false;
      state.msg =  "";
  
      }
    },
    extraReducers: (builder) =>{
        builder
               
           //  sendAutomatedEmail

          .addCase(sendAuto.pending, (state) =>{
            state.sendingEmail = true;

           })
           .addCase(sendAuto.fulfilled, (state, action) =>{
            state.sendingEmail = true;
            state.emailSent= true;
            state.msg= action.payload;
           
            toast.success(action.payload)
            
            
           
            
           })
           .addCase(sendAuto.rejected, (state, action) =>{
            state.sendingEmail = false;
            state.emailSent= false;
            state.msg= action.payload;
           
            toast.success(action.payload)
           
            
           })
    }
  });
  

export const { EMAIL_RESET} = emailSlice.actions

export default emailSlice.reducer