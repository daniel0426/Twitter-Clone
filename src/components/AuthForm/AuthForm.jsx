import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "@firebase/auth";
import { authService } from "../../fbase";
import styles from './AuthForm.module.css'


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
    <div className={styles.loginForm}>
      <form action="" onSubmit={onSubmit} className={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
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
        <button className={styles.submitBtn} type="submit" >{newAccount ? "Create Account" : "Log In"}</button>
      </form>
      <button className={styles.toggleBtn} onClick={toggleAccount}>{newAccount ? "Login" :   "Sign In"}</button>
      {error && <p className={styles.error} >{error}</p>}
    </div>
  );
};

export default AuthForm;
