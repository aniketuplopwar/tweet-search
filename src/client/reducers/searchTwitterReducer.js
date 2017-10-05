export const searchTweetReducer = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_TWEET_INPROGRESS':
      return  action.info
    case 'SEARCH_TWEET_SUCCESS':
      return action.info
    default:
      return state
  }
}
