import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios'
import * as tweetActions from '../../actions/searchTweetActions';
import './searchPanel.scss';

export class SearchPanel extends React.Component {

  filter(searchString) {
    return searchString.replace(/[^a-zA-Z ]/, '');
  }

  initiateSearch(searchString) {
    this.searchTweets(searchString)
  }

  submit() {
    const searchString = this.refs.searchString.value.trim();
    this.initiateSearch(this.filter(searchString));
  }

  searchTweets = (searchString) => {
    const API_URL = '/services/search';
    const URL = API_URL.concat('/').concat(searchString);
    this.props.searchTweetInProgress();

    axios(URL).then((response) => {
        response.json().then(tweetSearchResult => {
          this.props.searchTweetSuccess({
            searchString, tweetSearchResult, searchInProgress: false,
          });
        });
    }).catch(error => {
      throw (error);
    });
  };

  render() {
    return (
      <div className="search-panel">
        <h1>
          <img alt="" src="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_normal.jpg" />
          <div className="tweet-search-title">Tweet Search </div>
        </h1>
        <input
          type="text"
          id="search-string"
          ref="searchString"
          onKeyUp={e => { if (e.keyCode === 13) this.submit(); }} />
        <button className="search-btn" onClick={() => this.submit()}>Search</button>
      </div>
    );
  }
};

SearchPanel.propTypes = {
  searchTweetInProgress:  PropTypes.func.isRequired,
  searchTweetSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchTweetSuccess: searchResult => dispatch(tweetActions.searchTweetSuccess(searchResult)),
    searchTweetInProgress:() => dispatch(tweetActions.searchInProgress({
      'searchInProgress': 'true',
    }))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
