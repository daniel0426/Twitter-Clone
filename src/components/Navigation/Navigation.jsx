import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { BsTwitter } from "react-icons/bs";
import {CgProfile} from 'react-icons/cg';

const Navigation = ({ userObj }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li >
          <Link to="/" className={styles.home}>
            <BsTwitter className={styles.icon}/>
          </Link>
        </li>
        <li >
          <Link to="/profile" className={styles.user}>
            <CgProfile className={styles.icon}/>
            <span>
              {userObj.displayName ? `${userObj.displayName}'s` : "User"}{" "}
              Profile
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
