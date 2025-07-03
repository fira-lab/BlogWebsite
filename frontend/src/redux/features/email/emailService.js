import axios from "axios";
import {API_URL} from "../auth/authSevice";


const sendAuto = async(emailData) =>{
    const response = await axios.post(API_URL +
    "autoEmail", emailData);
    return response.data.message;
}

const emailService ={
    sendAuto

}

export default emailService