import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
const Navigation = ({userObj}) => {
    return (
       
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/profile'>{userObj.displayName ? `${userObj.displayName}'s` : "User"} Profile</Link></li>
                </ul>
            </nav>
    
    )
}

export default Navigation
