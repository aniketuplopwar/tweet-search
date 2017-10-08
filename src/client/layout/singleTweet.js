import React from 'react';
import axios from 'axios';

import Header from '../components/header/header';
import Tweet from '../components/tweet/tweet';
import Spinner from '../components/spinner/spinner';

export default class SingleTweet extends React.Component {
  constructor(){
    super();
    this.state = {
      tweetInfo: {}
    }
  }

  componentDidMount() {
    axios('/services/getHtml/'+this.props.match.params.tweetUserId+'/'+this.props.match.params.tweetId).then(response => {
      this.setState({
        tweetInfo: response.data
      });
    });
  }

  render() {
    let tweet = this.state.tweetInfo.tweetHTML ? <Tweet tweetInfo={this.state.tweetInfo} /> : <Spinner />;
    return (
      <div className="page-align-center">
        <Header />
          {tweet}
      </div>
    );
  }
}