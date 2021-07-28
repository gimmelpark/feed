import JSONfeed from '@/feed/feed.json'

const state = () => ({
  feed: [],

  fetchStarted: false,
  allFeedLoaded: false,
})

const getters = {
  getFeed: state => state.feed,

  isAllFeedLoaded: state => state.allFeedLoaded,
}

const mutations = {
  setFeed (state, feed) {
    state.feed = feed
  },

  setFetchStarted (state, status) {
    state.fetchStarted = status
  },
  allFeedLoaded (state) {
    state.allFeedLoaded = true
  },
}

const actions = {
  async fetchMessages ( { commit, state } ) {
    if ( !state.fetchStarted ) {
      commit ('setFetchStarted', true)
      const newMessages = await getFeedFromJson(state.feed.length, 10)
      commit ('setFetchStarted', false)
      if ( newMessages.length > 0 ) {
        commit ('setFeed', state.feed.concat( newMessages ))
      } else {
        commit ('allFeedLoaded')
      }
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

const getFeedFromJson = function (begin, count) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve (JSONfeed.slice(begin, begin + count))
    }, 500);
  })
}
