import React from 'react'
import { connect } from 'react-redux'
import * as tweetActions from '../../actions/searchTweetActions'
import './searchPanel.scss'

class SearchPanel extends React.Component {
  filter(searchString) {
    return  searchString.replace(/[^a-zA-Z ]/, "");
  }

  submit () {
    let searchString = document.getElementById('search-string').value
    this.props.searchTweets(this.filter(searchString))
  }

  render () {
    return (
      <div className="search-panel">
          <h1>
            <img src="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_normal.jpg" />
            <div className='tweet-search-title'>Tweet Search </div>
          </h1>
          <input type='text' id='search-string' onKeyUp={e => e.keyCode === 13? this.submit(): undefined} />
          <button onClick={e => this.submit()}>Search</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchTweets: searchString => dispatch(tweetActions.searchTweets(searchString))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)
