import { getError } from "../../utils/helpers";
import UserService from "../../services/UserService";

export const namespaced = true;

export const state = {
    users: [],
    meta: null,
    links: null,
    loading: false,
    error: null,
};

export const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_META(state, meta) {
        state.meta = meta;
    },
    SET_LINKS(state, links) {
        state.links = links;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

export const actions = {
    getUsers( { commit }) {
        UserService.getUsers()
                .then((response) => {
                    commit("SET_USERS", response.data.data);
                })
                .catch((error) => {
                    commit("SET_ERROR", getError(error));
                });
    },
    updateUser( { commit }, id) {
        UserService.updateUser(id)
                .then((response) => {
                })
                .catch((error) => {
                    commit("SET_ERROR", getError(error));
                });
    },

    setLoading( { commit }, loading) {
        commit("SET_LOADING", loading);
    }
};

export const getters = {
    users: (state) => {
        return state.users;
    },
    meta: (state) => {
        return state.meta;
    },
    links: (state) => {
        return state.links;
    },
    loading: (state) => {
        return state.loading;
    },
    error: (state) => {
        return state.error;
    },
};
