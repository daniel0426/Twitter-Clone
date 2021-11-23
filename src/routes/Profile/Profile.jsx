import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css';
import { authService, dbService } from '../../fbase'
import { signOut } from '@firebase/auth'
import { collection, query, where, getDocs, orderBy,  } from '@firebase/firestore'
import { updateProfile } from '@firebase/auth';
import { useNavigate } from 'react-router'

const Profile = ({refreshUser, userObj}) => {
    const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);

    const navigate = useNavigate()

    const onLogoutClick = ()=> {
        signOut(authService)
        navigate('/')
        refreshUser();
    }

    const getMyTweets  = async ()=> {
        const q = query(
            collection(dbService, 'tweets'), 
            where('creatorId', '==', userObj.uid),
            orderBy('createdAt', 'desc')
        );
        const myTweets = await getDocs(q);
        myTweets.forEach((doc)=> {
            console.log(doc.id, '=>', doc.data())
        })
    }

    const onChange = (event)=> {
        const {target :{value}} = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event)=> {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
        }
        refreshUser();
    }

    useEffect(()=> { 
        getMyTweets();
    }, [])

    return ( 
        <div className={styles.profile}>
            <form onSubmit={onSubmit} className={styles.form}>
                <input className={styles.updateInput} onChange={onChange} value={newDisplayName} type="text" placeholder='Display name' />
                <input className={styles.updateBtn} type="submit" value="Update Profile"/>
            </form>
            <button className={styles.logoutBtn} onClick={onLogoutClick}>Log out</button>
        </div>
    )
}

export default Profile
