import React, { useEffect, useState } from "react";
import { dbService,  } from "../fbase";
import {
  collection,
  onSnapshot,
  query,
} from "@firebase/firestore";
import Tweet from "../components/Tweet/Tweet";
import TweetForm from "../components/TweetForm/TweetForm";



const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "tweets")
    );

     onSnapshot(q, (snapShot) => {
      const tweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), 
      }));
      setTweets(tweetArray);
    }); 
  }, []);

  return (
    <div>
        <TweetForm userObj={userObj}/>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj= {tweet} isOwner ={tweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
