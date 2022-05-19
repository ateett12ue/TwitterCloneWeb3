import React from "react";
import './Profile.css';
import {Link} from "react-router-dom"
import {defaultImgs} from "../defaultimgs"
import TweetInFeed from "../components/TweetInFeed";

const Profile = () => {
  return (
    <>
      <div className="pageIdentify">Profile</div>
      <img className="profileBanner" src={defaultImgs[1]}/>
      <div className="pfpContainer">
        <img className="profilePFP" src={defaultImgs[0]}/>
        <div className="profileName">Juhizzz</div>
        <div className="profileWallet">0x42..314</div>
        <Link to="/settings">
          <div className="profileEdit">
            Edit Profile
          </div>
        </Link>
        <div className="profileBio">
          Your Avg Web3 Mage
        </div>
        <div className="profileTabs">
          <div className="profileTab">
            Your Tweets
          </div>
        </div>
      </div>
      <TweetInFeed profile={true}/>
    </>
  );
};

export default Profile;

