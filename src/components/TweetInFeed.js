import React from "react";
import './TweetInFeed.css';
import {defaultImgs} from "../defaultimgs"
import golf from "../images/golf.png"
import {Icon} from "web3uikit"
const TweetInFeed = () => {
  

  return (
    <>
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"/>
        <div className="completeTweet">
        <div className="who">
          Juhizz
          <div className="accWhen">
            0x42..314 - 1h
          </div>
          </div>
          <div className="tweetContent">
            Nice Day 
            <img src={golf} className="tweetImg"/>
          </div>
          <div className="interactions">
            <div className="interactionNum">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle"/>
            </div>
            <div className="interactionNum">
              <Icon fill="#3f3f3f" size={20} svg="star"/>
              12
            </div>
            <div className="interactionNum">
              <Icon fill="#3f3f3f" size={20} svg="matic"/>
              
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TweetInFeed;

