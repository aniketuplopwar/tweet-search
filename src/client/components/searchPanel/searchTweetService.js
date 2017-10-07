

/**
 * Action initiates Tweet search and dispatch actions
 * searchInProgress & searchTweetSuccess accordingly
 * @param searchString
 * @returns {{type, info: *}}
 */
export const searchTweets = (searchString) => {
  const URL = API_URL.concat('/').concat(searchString);

  return (dispatch) => {
    dispatch(searchInProgress({
      searchInProgress: 'true',
    }));

    return fetch(URL).then((response) => {
      response.json().then(tweetSearchResult => {
        dispatch(searchTweetSuccess({
          searchString, tweetSearchResult, searchInProgress: false,
        }));
      });
    }).catch(error => {
      throw (error);
    });
  };
};
