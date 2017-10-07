import React from 'react';
import PropTypes from 'prop-types';
import Tweet from '../tweet/tweet';
import './tweetList.scss';

class TweetList extends React.Component {

  static NO_RESULT_FOUND_MESSAGE = '<h2>No result found for "<strong>{searchString}</strong>"</h2>';

  renderTweet(tweetInfo, tweetIdx) {
    return (
      <Tweet
        key={tweetIdx}
        tweetInfo={tweetInfo}
      />
    );
  }

  renderTweetFromList(tweetDataList) {
    let tweetList = [];
    for (let i = 0; i < tweetDataList.length; i++) {
      tweetList.push(this.renderTweet(tweetDataList[i], i));
    }
    return tweetList;
  }

  renderResult(searchString, tweetList) {
    let result;

    if (typeof searchString !== 'undefined' && tweetList.length === 0) {
      result = (
          <div
            className="no-result-found">
            {this.NO_RESULT_FOUND_MESSAGE}
          </div>
        );
    } else {
      let tweetListHTML = this.renderTweetFromList(this.props.tweets);

      result = (
        <div
          id="tweet-container">
          {tweetListHTML}
        </div>);
    }
    return result;
  }

  render() {
    const result = this.renderResult(this.props.searchString, this.props.tweets);
    return (
      <div
        className="tweet-list-container">
       {result}
      </div>
    );
  }
}

TweetList.propTypes = {
  searchString: PropTypes.string.isRequired,
  tweets: PropTypes.array,
};


export default TweetList;
