import React from 'react';

const dynamicText = (stringContent)=> {
  return () => {
    for(let i = 0; i< arguments.length; i++) {
      return stringContent.replace('{'+i+'}', arguments[i]);
    }
  };
};

const TweetSearchContent = {
  "PLEASE_WAIT": <h2> Please wait...</h2>,
  "WELCOME_MESSAGE": <h2> Welcome to tweet search, Please input text to search Tweets</h2>,
  "TWEET_SEARCH_FOR": dynamicText('Tweets search for "<strong>{0}</strong>"')
};


export default TweetSearchContent;