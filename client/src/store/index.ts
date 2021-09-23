import { createStore } from 'vuex'
import pagination from './modules/pagination';
import Friend from '../../interfaces/Friend'

export default createStore({

  state: {
    friends: [] as Friend[], // Raw API data
    filteredFriends: [] as Friend[], // Friends filtered by inputData
    inputData: '', // Filter value
    loading: true,
  },

  getters: {
    friends: (state) => state.friends,
    filteredFriends: (state) => state.filteredFriends,
    inputData: (state) => state.inputData,
    loading: (state) => state.loading,
  },

  mutations: {
    getFriendsAPI(state, friends: Friend[]) {
      state.friends = friends;
      state.filteredFriends = friends;
    },
    filterFriends: (state, friends: Friend[]) => state.filteredFriends = friends,
    inputData: (state, inputData: string) => state.inputData = inputData,
    loading: (state, loading: boolean) => state.loading = loading,
  },

  actions: {
    getFriendsAPI: async ( { commit, dispatch, rootState } : {commit: any, dispatch: any, rootState: any})  => {
      // Initialize main variables with API data
      const friends = await fetch('http://localhost:8000/api/get-friends').then( x => x.json());
      commit('getFriendsAPI', friends);
      commit('paginationFriends', friends);
      commit('loading', false);

      // Find how many pages there are
      const totalPages = Math.ceil(rootState.filteredFriends.length / rootState.pagination.pageSize);
      commit('totalPages', totalPages);

      dispatch('paginate');
    },
    
    filterFriends: ( { state, commit, rootState } : {state: any, commit: any, rootState: any} ) => {
      const filteredFriends = state.friends.filter((friend: Friend) => {
        state.inputData = state.inputData.toLowerCase();

        return friend.firstName
                .toLowerCase()
                .includes(state.inputData) || 
  
               friend.lastName
                .toLowerCase()
                .includes(state.inputData);
      })

      commit('filterFriends', filteredFriends);

      // Check if the total pages has changed
      const totalPages = Math.ceil(rootState.filteredFriends.length / rootState.pagination.pageSize);
      commit('totalPages', totalPages);
    }

  },

  modules: {
    pagination
  }

})
