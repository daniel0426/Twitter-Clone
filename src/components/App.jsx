import { useState, useEffect } from 'react';
import AppRouter  from './AppRouter'

import {authService} from '../fbase';
import {onAuthStateChanged, updateProfile} from "@firebase/auth"
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
 

  useEffect(async () => {
    onAuthStateChanged(authService, (user)=> {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          uid: user.uid,
          displayName : user.displayName ? user.displayName : 'User'
        });
        
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); 
    })
  }, []);

  const refreshUser = ()=> {
    setUserObj({
      displayName: authService.currentUser.displayName,
      uid: authService.currentUser.uid
    });
   
  }

  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn= {isLoggedIn} userObj={userObj}/> : "Initializing..."}
   
    </>
  );
}

export default App;
