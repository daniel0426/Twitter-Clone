import React, { useState } from "react";
import { dbService, storage } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";


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
    <div>
      {editing ? (
        <>
          <form onSubmit={editTweet}>
            <input
              type="text"
              onChange={onChange}
              value={newTweet}
              placeholder="Edit your Tweet"
              required
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img src={tweetObj.attachmentUrl} alt='profile' width="50" />
          )}
          {isOwner && (
            <>
              <button onClick={deleteTweet}> Delete Tweet</button>
              <button onClick={toggleEditing}> Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
