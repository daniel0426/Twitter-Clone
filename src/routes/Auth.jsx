import React from "react";
import styles from './Auth.module.css'
import { authService } from "../fbase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider,   } from "@firebase/auth";
import AuthForm from "../components/AuthForm/AuthForm";

import { FaGithub , FaGoogle} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs';

const Auth = () => {

  const onSocialClick = async  (event)=> {
    const {target: {name}} = event;
    let provider; 
    if(name === 'google' ){
      provider = new GoogleAuthProvider();
    }else if(name==='github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider)

  }

  return (
    <div className={styles.loginContainer}>
      <BsTwitter className={styles.logo}/>
      <AuthForm />
      <div className={styles.socialLogin}>
         <p >Or Sign up Using </p>
        <button className={styles.google} onClick={onSocialClick}  name='google'>Continue with Google <FaGoogle className={styles.icon} /></button>
        <button className={styles.github} onClick={onSocialClick} name='github'>Continue with Github <FaGithub className={styles.icon}/></button>
      </div>
    </div>
  );
};

export default Auth;
