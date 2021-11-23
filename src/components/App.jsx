import { useState, useEffect } from 'react';
import AppRouter  from './AppRouter'
import styles from './App.module.css';
import {authService} from '../fbase';
import {onAuthStateChanged} from "@firebase/auth"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(async () => {
    onAuthStateChanged(authService, (user)=> {
      if(user){
        setUserObj({
          uid: user.uid,
          displayName : user.displayName ? user.displayName : 'User'
        });
        
      } else {
        setUserObj(null)
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
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : <p className={styles.initialization}>Initializing...</p>}
    </>
  );
}

export default App;
