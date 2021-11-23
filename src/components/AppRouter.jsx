import React from "react";
import styles from './AppRouter.module.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile/Profile";
import Navigation from "./Navigation/Navigation";
import NotFound from "./NotFound/NotFound";

const AppRouter = ({refreshUser,  isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
    <div className={styles.container}>
        {isLoggedIn && <Navigation userObj={userObj}/>}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj}/>} />
              <Route path="profile" element={<Profile refreshUser={refreshUser}  userObj={userObj}/>} />
              <Route path='*' element={<NotFound/>} />
            </>
          
          ) : ( 
            <>
              <Route path="/" element={<Auth />} />
              <Route path='*' element={<NotFound/>} />
            </>
          )}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
