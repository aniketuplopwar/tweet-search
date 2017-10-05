import * as ActionTypes from './searchTweetActionTypes'

const API_URL = '/services/search'

/**
 * Action defines Tweet search was success and carries the result
 * @param info
 * @returns {{type, info: *}}
 */
export const searchTweetSuccess = (info) => {
  return {
    type: ActionTypes.SEARCH_TWEET_SUCCESS,
    info
  }
}


/**
 * Action defines Tweet search is in progress
 * @param info
 * @returns {{type, info: *}}
 */
export const searchInProgress = (info) => {
  return {
    type: ActionTypes.SEARCH_TWEET_INPROGRESS,
    info
  }
}

/**
* Action initiates Tweet search and dispatch actions searchInProgress & searchTweetSuccess accordingly
* @param searchString
* @returns {{type, info: *}}
*/
export const searchTweets = (searchString) => {
  let URL = API_URL + '/' + searchString;


  return (dispatch) => {

    dispatch(searchInProgress({
      'searchInProgress': 'true'
    }));

    return fetch(URL).then((response) => {
      response.json().then(json => {

        dispatch(searchTweetSuccess({
         'searchString': searchString, 'tweetSearchResult': json, 'searchInProgress': false
        }))
      })
    }).catch(error => {
      throw (error)
    })
  }
}
