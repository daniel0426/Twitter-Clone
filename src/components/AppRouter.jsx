import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import NotFound from "./NotFound";

const AppRouter = ({refreshUser,  isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default AppRouter;
