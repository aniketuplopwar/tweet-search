import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TweetList from '../tweetList/tweetList';
import Spinner from '../spinner/spinner';
import './tweetSearchResult.scss';

class TweetSearchResult extends React.Component {

  renderSearchNote(searchInProgress, searchString) {
    if (searchInProgress) {
      return (<h2> Please wait...</h2>);
    }
    return searchString === undefined ?
      (<h2> Welcome to tweet search, Please input text to search Tweets</h2>) :
      (<h4>Tweets search for "<strong>{searchString}</strong>"</h4>);
  }


  render() {
    const tweetSearchResult = this.props.tweetSearchResult;
    const tweetList = tweetSearchResult ? tweetSearchResult.tweetList : [];
    const searchString = this.props.searchString;
    const result = this.props.searchInProgress ? <Spinner /> :
      <TweetList searchString={searchString} tweets={tweetList} />;
    const searchNote = this.renderSearchNote(this.props.searchInProgress, this.props.searchString);


    return (
      <div>
        {searchNote}
        <div
          className="result-container">{result}</div>
      </div>
    );
  }
}

TweetSearchResult.propTypes = {
  searchInProgress: PropTypes.bool,
  tweetSearchResult: PropTypes.object,
  searchString: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    searchInProgress: state.tweetSearch ? state.tweetSearch.searchInProgress : false,
    tweetSearchResult: state.tweetSearch ? state.tweetSearch.tweetSearchResult : {},
    searchString: state.tweetSearch ? state.tweetSearch.searchString : '',
  };
};


const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(TweetSearchResult);
