import React, { useEffect, useState } from 'react'
import { authService, dbService } from '../fbase'
import { signOut } from '@firebase/auth'
import { collection, query, where, getDocs, orderBy,  } from '@firebase/firestore'
import { updateProfile } from '@firebase/auth';
import {  useNavigate } from 'react-router'

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
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={newDisplayName} type="text" placeholder='Display name' />
                <input type="submit" value="Update Profile"/>
            </form>        
            <button onClick={onLogoutClick}>Log out</button>
        </>
    )
}

export default Profile
