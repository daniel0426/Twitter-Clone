import React, { useState } from "react";
import { dbService, storage } from "../../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';
import styles from './Tweet.module.css'


const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const tweetRef = doc(dbService, "tweets", tweetObj.id);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const deleteTweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await deleteDoc(tweetRef);
      await deleteObject(ref(storage, tweetObj.attachmentUrl)); //delete image file from the storage
    }
  };

  const editTweet = async (event) => {
    event.preventDefault();
    await updateDoc(tweetRef, {
      text: newTweet,
    });
    setEditing(false);
  };

  return (
    <div className={styles.tweet}>
      {editing ? (
        <>
          <form onSubmit={editTweet} className={styles.tweetEdit}>
            <input
              className={styles.updateInput}
              type="text"
              onChange={onChange}
              value={newTweet}
              placeholder="Edit your Tweet"
              maxLength='50'
              required
            />
            <div className={styles.editControl}>
              <input type="submit" value="Update"/>
              <ImCancelCircle onClick={toggleEditing} className={styles.cancelBtn}/>
            </div>
          </form>
        
          
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img className={styles.tweetImg} src={tweetObj.attachmentUrl} alt='profile' width="50" />
          )}
          {isOwner && (
            <div className={styles.control}>
              <AiOutlineDelete className={`${styles.icon} ${styles.deleteBtn}`} onClick={deleteTweet}/>
              <AiOutlineEdit className={`${styles.icon} ${styles.updateBtn}`} onClick={toggleEditing}/>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
