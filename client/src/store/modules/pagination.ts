import Friend from '../../../interfaces/Friend'

interface State {
  paginationFriends: Friend[], 
  pagesNav: number[],
  currentPage: number,
  maxPages: number,
  pageSize: number, // Number of friends per page
  totalPages: number
}

export default {

  state: {
    paginationFriends: [] as Friend[], // Friends displayed in FriendList.vue, contains (pageSize) friends of the currentPage
    pagesNav: [] as number[],
    currentPage: 1,
    maxPages: 10, // Number of pages shown on the nav
    pageSize: 10, // Number of friends per page
    totalPages: 0
  },

  getters: {
    pagesNav: (state: State) => state.pagesNav,
    currentPage: (state: State) => state.currentPage,
    paginationFriends: (state: State) => state.paginationFriends,
    totalPages: (state: State) => state.totalPages,
  },

  mutations: {
    currentPage: (state: State , currentPage: number) => {
      if(currentPage > 0 && currentPage <= state.totalPages) {
        state.currentPage = currentPage; 
      }
    },
    totalPages: (state: State, pages: number ) => state.totalPages = pages,
    pagesNav: (state: State, pagesNav: number[]) => state.pagesNav = pagesNav,
    paginationFriends: (state: State, friends: Friend[]) => state.paginationFriends = friends,
  },

  actions: {
    paginate: ( { state, commit, rootState } : { state: State, commit: any, rootState: any }) => {
      // Get the first friend position and the last one for the current page 
      const min = (state.currentPage - 1) * state.pageSize; // 0 10 20 30 ..
      const max = state.currentPage * state.pageSize - 1; // 9 19 29 39 ..

      // Filter friends for the current page
      const paginationFriends = rootState.filteredFriends.filter((friend: Friend, index: number) => {
        return index >= min && index <= max;
      })

      commit('paginationFriends', paginationFriends);

      // Build the numbers for page nav list
      const pagesNav = [];

      const middle = Math.round(state.maxPages / 2);
      const firstPage = state.currentPage <= middle ? 1 : state.currentPage - middle;
      const lastPage = firstPage + state.maxPages;

      for(let x = firstPage; x < lastPage; x++) {
        if(x <= state.totalPages) pagesNav.push(x);
      }
      
      commit('pagesNav', pagesNav);
    }
    
  }
} 