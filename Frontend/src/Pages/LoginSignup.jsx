import React, { useState } from 'react'
import './CSS/LoginSignup.css'
// import { set } from 'mongoose';

function LoginSignup() {

const [state,setState]=useState("Login");

const [formData,setFormData]=useState({
  username:"",
  password:"",
  email:""
})
const login=async()=>{
 
    console.log("Login Function",formData);

    let responseData;
  await fetch('http://localhost:4000/login',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  }).then((response)=> response.json()).then((data)=>responseData=data)

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace('/');
  }
  else{
    alert(responseData.errors);
  }

}

//to get data from input field create a changhandler function which will work onChange property
const changeHandler=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
}

const signup=async()=>{
  console.log("Signup Function",formData);
  let responseData;
  await fetch('http://localhost:4000/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  }).then((response)=> response.json()).then((data)=>responseData=data)

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace('/');
  }
  else{
    alert(responseData.errors);
  }
}

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>} 
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email'/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
       {state==="Sign Up"?<p className="loginsignup-login">Already have an account ?<span onClick={()=>{setState("Login")}}>Login</span></p>
       :<p className="loginsignup-login">Create an account ?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
      } 

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing ,I agree to the terms and conditions</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup