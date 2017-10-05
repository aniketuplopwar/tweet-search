import React from 'react'
import './tweet.scss'

class Tweet extends React.Component {
  createMarkup (tweetHTML) {
    return { __html: tweetHTML }
  }

  render() {
    let tweetInfo = this.props.tweetInfo,
        tweetUrl = '/' + tweetInfo.tweetUserId + '/' + tweetInfo.tweetId;

    return (
      <div className="tweet-container">
        <div dangerouslySetInnerHTML={this.createMarkup(tweetInfo.tweetHTML)} />
        <a href={tweetUrl} target='_blank'> Open in new tab</a>
      </div>
    )
  }
}

export default Tweet