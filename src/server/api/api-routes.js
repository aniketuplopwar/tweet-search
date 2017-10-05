import express from 'express';
import SearchTweetAPI from './tweetSearchService';

const router = express.Router();


/**
 * Handling '/search' url to search tweet based on search string
 * URL params-
 *   searchString: string to search tweets
 **/
router.get('/search/:searchString', function (req, res) {
  try {
    SearchTweetAPI.searchTweets(req.params.searchString).then(data=>{
      res.send(data);
    }).catch(err=>{
      console.log(err);
      res.send(data);
    });
  }catch(err) {
    console.log('ERROR: '+err);
  }

});

module.exports = router;