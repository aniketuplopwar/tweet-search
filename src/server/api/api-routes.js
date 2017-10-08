import express from 'express';
import SearchTweetService from './services/tweetSearchService';
import TweetHTMLService from './services/tweetHTMLService';

const routerApi = express.Router;
const router = routerApi();


/**
 * Handling '/search' url to search tweet based on search string
 * URL params-
 *   searchString: string to search tweets
 **/
router.get('/search/:searchString', (req, res) => {
  SearchTweetService.searchTweets(req.params.searchString).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});

router.get('/getHtml/:tweetUserId/:tweetId', (req, res) => {
  TweetHTMLService.getTweetInfo(req.params.tweetUserId, req.params.tweetId).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});

router.post('/getTweetHTMLList', (req,res) => {
  TweetHTMLService.getInfoForTweetList(tweetList).then(data => {

  })
});

module.exports = router;
