import React,{useState, useRef} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {defaultImgs} from '../defaultimgs'
import { TextArea, Icon } from "web3uikit";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
const Home = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const {Moralis} = useMoralis();
  const user = Moralis.User.current()
  const contractProccessor = useWeb3ExecuteFunction();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  const onImageClick= () => {
    inputFile.current.click();
  }
  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img)
    setSelectedFile(URL.createObjectURL(img))
  }

  const maticTweet = async() => {
    if(!tweet) return;

    let img;
    if(theFile){
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }
    else
    {
      img = "No Img"
    }
    let options = {
      contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      functionName: "addTweet",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tweetTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tweetImg",
            "type": "string"
          }
        ],
        "name": "addTweet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1)
    }

    await contractProccessor.fetch({
      params: options,
      onSuccess: ()=>{
        saveTweet()
      },
      onError:(error)=>{
        console.log(error.data.message )
      }
    })
  }
  const saveTweet = async() => {
    if(!tweet) return;
    const Tweets = Moralis.Object.extend("Tweets")
    const newTweet = new Tweets();
    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);
    
    if(theFile){
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs())
    }

    await newTweet.save();
    window.location.reload();
  }

  return (
    <>
    <div className="pageIdentify">Home</div>
     <div className="mainContent">
      <div className="profileTweet">
        <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic" />
        <div className="tweetBox">
          <TextArea
            label=""
            name="tweetTxtArea"
            value="GM World"
            type="text"
            width="95%"
            onChange={(e)=>setTweet(e.target.value)}
          />
          {
            selectedFile && (
              <img src={selectedFile} className="tweetImg"/>
            )
          }
          <div className="imgOrTweet">
            <div className="imgDiv" onClick={onImageClick}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{display: "none"}}
              />
              <Icon fill="#1DA1F2" size={20} svg="image"/>
            </div>
            <div className="tweetOptions">
              <div className="tweet" onClick={()=>saveTweet()}>Tweet</div>
              <div className="tweet" onClick={()=>maticTweet()} style={{backgroundColor: "#8247e5"}}>
                <Icon fill="#ffffff" size={20} svg="matic"/>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <TweetInFeed profile={false}/>
     </div> 
    </>
  );
};

export default Home;
