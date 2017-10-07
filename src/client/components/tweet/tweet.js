import React from 'react';
import PropTypes from 'prop-types';
import './tweet.scss';

class Tweet extends React.Component {
  createMarkup(tweetHTML) {
    return { __html: tweetHTML };
  }

  render() {
    const tweetInfo = this.props.tweetInfo;
    const tweetUrl = '/'.concat(tweetInfo.tweetUserId).concat('/').concat(tweetInfo.tweetId);

    return (
      <div className="tweet-container">
        <div className="tweet-content" dangerouslySetInnerHTML={this.createMarkup(tweetInfo.tweetHTML)} />
        <a className="tweet-url" href={tweetUrl} target="_blank"> Open in new tab</a>
      </div>
    );
  }
}

Tweet.propTypes = {
  tweetInfo: PropTypes.object
};

export default Tweet;
