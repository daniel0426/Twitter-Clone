import React, { useState } from "react";
import styles from './TweetForm.module.css'
import { dbService, storage } from "../../fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const TweetForm = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

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

  return (
    <form onSubmit={submitTweet}>
      <input
        value={tweet}
        onChange={onChangeTweet}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Tweet" />
      {attachment && (
        <div>
          <img src={attachment} alt="profile" width="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetForm;
