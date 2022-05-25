import React, { useEffect, useState } from "react";
import "./TweetInFeed.css";
import { defaultImgs } from "../defaultimgs";
import golf from "../images/golf.png";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";

const TweetInFeed = (profile) => {
  const { Moralis, account } = useMoralis();
  const [tweetArr, setTweetArr] = useState();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (ex) {
        console.error(ex);
      }
    }
  }, [profile]);
  return (
    <>
      {tweetArr?.map((e) => {
        return (
          <div className="feedTweet">
            <img
              src={
                e.attributes.tweeterPfp
                  ? e.attributes.tweeterPfp
                  : defaultImgs[0]
              }
              className="profilePic"
            />
            <div className="completeTweet">
              <div className="who">
                {e.attributes.tweeterUserName.slice(0, 6)}
                <div className="accWhen">{
                `${e.attributes.tweeterAcc.slice(0,4)}...${e.attributes.tweeterAcc.slice(36)} . 
                 ${e.attributes.createdAt.toLocalString("en-us", {month: "short"})}
                 ${e.attributes.createdAt.toLocalString("en-us", {day: "numeric"})}`
                 }</div>
              </div>
              <div className="tweetContent">
                {e.attributes.tweetTxt}
                {e.attributes.tweetImg && (
                  <img src={e.attributes.tweetImg} className="tweetImg" />
                )}
              </div>
              <div className="interactions">
                <div className="interactionNum">
                  <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                </div>
                <div className="interactionNum">
                  <Icon fill="#3f3f3f" size={20} svg="star" />
                  12
                </div>
                <div className="interactionNum">
                  <Icon fill="#3f3f3f" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        );
      }).reverse()}
    </>
  );
};

export default TweetInFeed;
