import React from 'react'
import TweetSearchResult from './tweetSearchResult/tweetSearchResult'
import SearchBox from './searchPanel/searchPanel'
import './app.scss'

class App extends React.Component {
  render () {
    return (
      <div className='page-align-center'>
        <SearchBox />
        <TweetSearchResult />
      </div>
    )
  }
}

export default App
