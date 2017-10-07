import express from 'express';
import SearchTweetAPI from './tweetSearchService';

const routerApi = express.Router;
const router = routerApi();


/**
 * Handling '/search' url to search tweet based on search string
 * URL params-
 *   searchString: string to search tweets
 **/
router.get('/search/:searchString', (req, res) => {
  try {
    SearchTweetAPI.searchTweets(req.params.searchString).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
