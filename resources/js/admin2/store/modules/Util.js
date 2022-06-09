export const namespaced = true;
export const state = {
    drawer: true,
    loading: false,
};

export const mutations = {
    SET_LOADING(state, value) {
        state.loading = value;
    },

    toggleDrawer(state) {
        state.drawer = !state.drawer;
    }
};

export const actions = {
    setLoading( { commit }, value) {
        commit("SET_LOADING", value);
    },

    TOGGLE_DRAWER( { commit }) {
        commit('toggleDrawer');
    }
};

export const getters = {
    loading: (state) => {
        return state.loading;
    },

    DRAWER_STATE(state) {
        return state.drawer;
    }
};
