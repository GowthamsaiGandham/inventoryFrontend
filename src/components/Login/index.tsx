import { useState } from "react";

import Cookies from 'js-cookie';

import { useNavigate } from "react-router-dom";

import "./index.css"


interface BodyDataType{
    username:string,
    password:string,
    role:string
}

const Login = ()=>{
     const [username,setUsername] = useState<string>("");

     const [password,setPassword] = useState<string>("");

     const navigate = useNavigate();

     const [role,setRole] = useState<string>("ADMIN");

     const [isError,setError] = useState<boolean>(false);

     const onChangingUsername = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(event.target.value);
     }

     const onChangingPassword = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value);
     }

     const onSuccessfulLogin = (jwtToken:string)=>{
         Cookies.set("jwtToken",jwtToken);
         navigate("/");
     }

     const onFailedLogin = ()=>{
        setError(true);
     }

     const submitLoginDetails = async ()=>{
        
        const loginData:BodyDataType = {
            username,
            password,
            role
        }

        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(loginData)
        }

        const response =  await fetch("https://inventorymanagement-wiks.onrender.com/login",options);

        if(response.ok == true){
            const jsonData = await response.json();
            onSuccessfulLogin(jsonData.token);
        }
        else{
            setUsername("");
            setPassword("");
            onFailedLogin();
    
        }
           
       
     }

     const onChangingRole = (event:React.ChangeEvent<HTMLSelectElement>)=>{
         setRole(event.target.value);
     }

     const onSubmittingForm = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        submitLoginDetails();
     }

     return(
     <div className="login-bg-container">
        <form onSubmit={onSubmittingForm} className="login-card-container">
            <div className="input-el-and-label-container">
               <label className="username-label" htmlFor="username">Username</label><br/>
               <input type="text" className="username-input-element" id="username" value = {username} onChange={onChangingUsername}/>
            </div>
            <div className="input-el-and-label-container">
               <label className="username-label" htmlFor="password">Password</label><br/>
               <input type="password" className="username-input-element" id="password" value = {password} onChange={onChangingPassword}/>
            </div>
            <div className="input-el-and-label-container">
                <label className="username-label" htmlFor="role">Role</label><br/>
                <select value={role} className="username-input-element role-select-element" onChange={onChangingRole}>
                    <option  value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className = 'submit-btn-container'>
                <button className = "submit-btn" type="submit" >Submit</button>
            </div>
            {isError &&<div>
                <p className = "error-msg">*Invalid Credentials</p>
             </div>}
        </form>
        </div>
     )
}


export default Login;