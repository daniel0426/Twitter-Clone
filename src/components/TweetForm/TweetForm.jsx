import React, { useRef, useState } from "react";
import styles from './TweetForm.module.css'
import { dbService, storage } from "../../fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {GrAddCircle} from 'react-icons/gr'
import {FiDelete} from 'react-icons/fi'

const TweetForm = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInputRef = useRef();

  const submitTweet = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    try {
      if (attachment !== "") {
        const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(response.ref);
      }
      const tweetObj = {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };
      await addDoc(collection(dbService, "tweets"), tweetObj);
      setTweet("");
      setAttachment("");
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };

  const onChangeTweet = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  const onAddPhotoClick = (event)=> {
    event.preventDefault();
    fileInputRef.current.click();
  }

  return (
    <form onSubmit={submitTweet} className={styles.form}>
      <div className={styles.field}>
        <input
          value={tweet}
          onChange={onChangeTweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={100}
        />
        <input className={styles.fileInput} ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} />
        <button type='submit'><GrAddCircle className={styles.submitIcon}/></button>
      </div>
      <button className={styles.addBtn} onClick={onAddPhotoClick}>+ Add Photo </button>
      {attachment && (
        <div className={styles.imgPreview}>
            <img src={attachment} alt="profile" style={{
                backgroundImage: attachment,
              }} />
            <div className={styles.remove} onClick={onClearAttachment}>
              <span >Remove</span>
              <FiDelete className={styles.deleteIcon}/>
            </div>
        </div>
      )}
    </form>
  );
};

export default TweetForm;
