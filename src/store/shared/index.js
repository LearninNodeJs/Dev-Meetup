
export default {
  state:{
    user:null,
    loading:false,
    error:null
  },
  mutations:{
    setLoading(state,payload){
      state.loading = payload;
    },
    setError(state,payload){
      state.error = payload;
    },
    clearError(state){
      state.error = null;
    }
  },
  actions:{
    clearError({commit}) {
      commit('clearError');
    }
  },
  getters:{
    error(state){
      return state.error
    },
    loading(state){
      return state.loading
    }
  }
};
