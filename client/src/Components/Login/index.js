import React, {useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import './style.css';
import { userContext } from '../../userContext';
import axios from 'axios';
import Cookies from 'js-cookie';


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state,setState} = useContext(userContext);
   
     useEffect(()=>{
   
    },[]);

    
    

 
    const handleForm = async (e) => {
        e.preventDefault();
        sessionStorage.setItem('user',email);
        try {
            let user = {
                email,password
            }
            const response = await axios.post('https://snapqr-backend.onrender.com/login',user);
            console.log(response);
            setState({
                ...state,
                user:response.data.accessToken,
                userState:false
            });
            Cookies.set('accessToken',response.data.accessToken,{expires:1/24});

        } catch (error) {
            
        }
       
    }

    return (
        <div className='container' >
            <div className='login'>
                <h1>Login</h1>
                <div>
                    <form onSubmit={handleForm}>
                        <TextField
                            sx={{
                                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "dodgerblue"
                                },
                                "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "dodgerblue"
                                },
                                "& .MuiInputLabel-root": {
                                    color: "black",
                                    bottom: "8px"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "black"
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "12px",
                                    padding: "14px 7px",
                                    height: "22px",
                                    color: "black"
                                },
                            }}
                            type='email'
                            label="Email"
                            placeholder='Enter email address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className='inputField'
                        />
                        <TextField
                            sx={{
                                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "dodgerblue"
                                },
                                "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "dodgerblue"
                                },
                                "& .MuiInputLabel-root": {
                                    color: "black",
                                    bottom: "8px"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "black"
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "12px",
                                    padding: "14px 7px",
                                    height: "22px",
                                    color: "black"
                                },
                            }}
                            type='password'
                            label="Password"
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className='inputField'
                        />
                        <button className='auth-btn' type='submit'>Login</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default LoginPage;