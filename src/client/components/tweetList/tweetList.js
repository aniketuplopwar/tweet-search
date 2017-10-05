import React from 'react'
import Tweet from '../tweet/tweet';
import './tweetList.scss'

class TweetList extends React.Component {
  renderTweet (tweetInfo) {
    return (
      <Tweet tweetInfo={tweetInfo} />
    )
  }

  renderTweetFromList (tweetDataList) {
    let tweetList = []
    for (let i in tweetDataList) {
      tweetList.push(this.renderTweet(tweetDataList[i], i))
    }
    return (
      <div>{tweetList}</div>
    )
  }

  renderResult (searchString, tweetList) {
    if( typeof searchString !== 'undefined' && tweetList.length === 0) {
      return (
        <div>
          <h2> No result found for "<strong>{searchString}</strong>"</h2>
        </div>
      )
    } else {
      let tweetListHTML = this.renderTweetFromList(this.props.tweets);
      return( <div id='tweet-container'>{tweetListHTML}</div>)
    }

  }

  render () {
    let result = this.renderResult(this.props.searchString, this.props.tweets)
    return (
      <div className='tweet-list-container about'>
        <div id='tweet-container'>{result}</div>
      </div>
    )
  }
}

export default TweetList
