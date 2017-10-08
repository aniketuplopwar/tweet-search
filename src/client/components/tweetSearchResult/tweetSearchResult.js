import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import * as tweetActions from '../../actions/searchTweetActions';
import TweetList from '../tweetList/tweetList';
import Spinner from '../spinner/spinner';
import TweetSearchContent from '../../constants/tweetSearchContent';
import './tweetSearchResult.scss';

class TweetSearchResult extends React.Component {
  constructor() {
    super();
    this.currentPage = 0;
    this.itemsPerPage = 10;
    this.tweetSearchResult = {
      tweetList: [],
      totalTweets: [],
      currentPage: 0,
      searchString: '',
      loadMoreTweetsInProgress: false,
    };
  }

  calculatePageRemaining(totalItem, itemsPerPage, currentPage) {
    if (totalItem <= itemsPerPage) return 0;
    return totalItem / itemsPerPage - currentPage;
  }

  loadMoreTweetSuccess() {
    const start = this.props.tweetSearchResult.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const tweetsForNextPage = this.props.tweetSearchResult.totalTweets.slice(start, end);
    this.props.loadMoreTweetsInProgress();
    axios.post('/services/getTweetHTMLList', { tweetsForNextPage }).then((response) => {
      const moreTweetResponse = {
        currentPage: this.props.currentPage + 1,
        tweetList: response.data,
      };
      this.props.loadMoreTweetsSuccess(moreTweetResponse);
    });
  }

  renderResult(tweetSearchResult) {
    if (this.props.searchInProgress) return (<Spinner />);

    return (
      <TweetList
        searchString={tweetSearchResult.searchString}
        tweets={tweetSearchResult.tweetList} />);
  }

  renderLoadMoreButton(loadMoreInProgress, tweetSearchResult) {
    if (loadMoreInProgress) {
      return  (<Spinner />);
    }
    const pageRemaining = this.calculatePageRemaining(tweetSearchResult.totalTweets.length, this.itemsPerPage, tweetSearchResult.currentPage);

    if (tweetSearchResult !== '' && pageRemaining >= 1) {
      return (<button
        onClick={() => { this.loadMoreTweetSuccess(); }}>
        load more
      </button>);
    }
  }

  renderSearchNote(searchInProgress, searchString) {
    if (searchInProgress) {
      return TweetSearchContent.PLEASE_WAIT;
    }
    return searchString === '' ? (TweetSearchContent.WELCOME_MESSAGE) :
      (TweetSearchContent.TWEET_SEARCH_FOR.concat(' "').concat(searchString).concat('"'));
  }

  render() {
    const tweetSearchResult = this.props.tweetSearchResult ? this.props.tweetSearchResult :
      this.tweetSearchResult;
    const searchNote = this.renderSearchNote(this.props.searchInProgress, tweetSearchResult.searchString);
    const result = this.renderResult(tweetSearchResult);
    const loadMoreButton = this.renderLoadMoreButton(tweetSearchResult.loadMoreTweetsInProgress, tweetSearchResult);

    return (
      <div>
        {searchNote}
        <div
          className="result-container">{result}</div>
        {loadMoreButton}
      </div>
    );
  }
}

TweetSearchResult.propTypes = {
  searchInProgress: PropTypes.bool,
  tweetSearchResult: PropTypes.object,
  searchString: PropTypes.string,
  loadMoreTweetsInProgress: PropTypes.func.isRequired,
  loadMoreTweetsSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchInProgress: state.tweetSearch ? state.tweetSearch.searchInProgress : false,
    tweetSearchResult: state.tweetSearch ? state.tweetSearch.tweetSearchResult : {},
    searchString: state.tweetSearch ? state.tweetSearch.searchString : '',
    currentPage: state.tweetSearch && state.tweetSearch.tweetSearchResult ?
      state.tweetSearch.tweetSearchResult.currentPage : 0,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreTweetsSuccess: moreTweets => dispatch(tweetActions.loadMoreTweetSuccess(moreTweets)),
    loadMoreTweetsInProgress: () => dispatch(tweetActions.loadMoreTweetsInProgress({ loadMoreTweetsInProgress: true })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetSearchResult);
