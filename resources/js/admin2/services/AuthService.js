import axios from "axios";
import store from "../store";
import * as API from "../services/API";

export const authClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            store.getters["auth/authUser"] &&
            !store.getters["auth/guest"]
        ) {
            store.dispatch("auth/logout");
        }
        return Promise.reject(error);
    }
);

export default {
    async login(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/login", payload);
    },
    logout() {
        return authClient.post("/logout");
    },
    async forgotPassword(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/forgot-password", payload);
    },
    /**
     * Get user Auth Data
     * @returns
     */
    getAuthUser() {
        return authClient.get("/api/users/auth");
    },
    /**
     * Reset password
     * @param {*} payload
     * @returns
     */
    async resetPassword(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/reset-password", payload);
    },
    /**
     * Update password
     * @param {*} payload
     * @returns
     */
    updatePassword(payload) {
        return authClient.put("/user/password", payload);
    },
    /**
     * Register user
     * @param {*} payload
     * @returns
     */
    async registerUser(payload) {
        await authClient.get("/sanctum/csrf-cookie");
        return authClient.post("/register", payload);
    },
    /**
     * Send verification email
     * @param {*} payload
     * @returns
     */
    sendVerification(payload) {
        return authClient.post("/email/verification-notification", payload);
    },
    updateUser(payload) {
        return authClient.put("/user/profile-information", payload);
    },
    /**
     * Has user permission?
     * @param {*} permission
     * @returns
     */
    hasPermission(permission) {
        let user = store.getters["auth/authUser"];
        return user.permissions.includes(permission);
    },
    /**
     * Has user one role?
     * @param {*} role
     * @returns
     */
    hasRole(role) {
        let user = store.getters["auth/authUser"];
        if (user == null) {
            return false;
        }
        return user.roles.includes(role);
    },
    /**
     * Has user some of role?
     * @param {*} roles
     * @returns
     */
    hasSomeRole(roles) {
        var hasPermission = true;

        store.dispatch("auth/getAuthUser");
        let user = store.getters["auth/authUser"];

        roles.forEach(function (role) {
            let user = store.getters["auth/authUser"];
            store.dispatch("auth/getAuthUser");

            if (role == 'auth') {
                if (!user) {
                    hasPermission = false
                }
            }
            hasPermission = user.roles.includes(role);
        });

        return hasPermission;
    }
};
