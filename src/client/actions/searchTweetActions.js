import * as ActionTypes from './searchTweetActionTypes';

/**
 * Action defines Tweet search was success and carries the result
 * @param info
 * @returns {{type, info: *}}
 */
export const searchTweetSuccess = info => {
  return {
    type: ActionTypes.SEARCH_TWEET_SUCCESS,
    info,
  };
};


/**
 * Action defines Tweet search is in progress
 * @param info
 * @returns {{type, info: *}}
 */
export const searchInProgress = info => {
  return {
    type: ActionTypes.SEARCH_TWEET_INPROGRESS,
    info,
  };
};
