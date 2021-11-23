import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'
import {AiOutlineArrowRight} from 'react-icons/ai'

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1>Not found</h1>
            <Link to='/'><button className={styles.button}>Go Back to Main page <AiOutlineArrowRight className={styles.refreshIcon}/> </button></Link>
        </div>
    )
}

export default NotFound
