import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "@firebase/auth";
import { authService } from "../fbase";


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('')
  

    const onChange = (event) => {
        const {target: {name, value}} = event;
          if(name === 'email') {
              setEmail(value)
          }else if(name==='password'){
              setPassword(value)
          }
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        let data;
        if(newAccount){
           data = await createUserWithEmailAndPassword(authService, email, password);
          console.log(data);
       }else {
           data = await signInWithEmailAndPassword(authService, email, password)
       }
      }catch (error){
       setError(error.message);
      }
      
    };


  const toggleAccount = ()=> {
    setNewAccount(prev => !prev)
  }


  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error && <p >{error}</p>}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Login" : "Sign In"}</span>
    </>
  );
};

export default AuthForm;
