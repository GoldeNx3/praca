import * as API from "../services/API";

export default {
    getUser(userId) {
        return API.apiClient.get(`/api/users/${userId}`);
    },
//    getUsers() {
//        return API.apiClient.get('/api/users');
//    },
    updateUser(id, payload) {
        return API.apiClient.put(`/api/users/${id}/update`, payload);
    },


    /**
     * Pobiera uczestników opiekuna
     * @param int id
     * @controller
     * @returns {unresolved}
     */
    getParticipants(id) {
        return API.apiClient.get(`/api/user/${id}/participants`);
    },

    /**
     * Tworzy użytkownika
     * @param {type} payload
     * @controller UserController.store
     * @returns {unresolved}
     */
    createUser(payload) {
        return API.apiClient.post('/api/users/store', payload);
    },
    destroyUser(id, payload) {
        return API.apiClient.post(`/api/users/${id}/destroy`, payload);
    },
    getGroups(id) {
        return API.apiClient.get(`/api/user/${id}/groups`);
    },
    getReplacements(id) {
        return API.apiClient.get(`/api/user/${id}/replacements`);
    },
    getActivities(id) {
        return API.apiClient.get(`/api/user/${id}/activities`);
    },
    getModerators() {
        return API.apiClient.get(`/api/user/moderators`);
    },
    getUsers() {
        return API.apiClient.get(`/api/users/users`);
    }
};
