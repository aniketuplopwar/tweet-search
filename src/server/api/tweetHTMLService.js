import request from 'request';
const TWITTER_OMBED_URL =  'https://publish.twitter.com/oembed?url=';


/**
 * Prepares Tweet Url from given tweetId and UserId
 * @param tweetId
 * @param tweetUserId
 * @returns {string}
 */
const prepareTweetUrl = (tweetId, tweetUserId)=> {
  return 'https://twitter.com/' + tweetUserId + '/status/' + tweetId;
}


/**
 * Fetch HTML info for a given tweet
 * @param tweetId
 * @param tweetUserId
 * @returns {Promise}
 */
const getTweetInfo = (tweetId, tweetUserId)=>{

  return new Promise((resolve, reject)=>{
    request(TWITTER_OMBED_URL+prepareTweetUrl(tweetId, tweetUserId), function (error, response, body) {
      if (!error && response.statusCode == 200) {
          let tweetInfo = {
            tweetId,
            tweetUserId,
            'tweetHTML' : JSON.parse(body).html
          }
          resolve(tweetInfo);
      }
      reject(error)
    })
  });
}


/**
 * Fetch HTML info for list of Tweet
 * @param tweetList
 * @returns {Promise}
 */
const getInfoForTweetList = (tweetList) => {
  return new Promise((resolve, reject) =>{
    let tweetHTMLPromises = [];
    for(let idx in tweetList) {
      let tweetInfo = tweetList[idx];
      let tweetPromise = getTweetInfo(tweetInfo.tweetId, tweetInfo.tweetUserId);
      tweetHTMLPromises.push(tweetPromise);
    }

    Promise.all(tweetHTMLPromises).then(data=>{
      resolve(data)
    }).catch(err => {
      reject(err)
    });

  })

}

export default {
  getTweetInfo,
  getInfoForTweetList
};