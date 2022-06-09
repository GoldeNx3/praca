/*
 * This is the initial API interface
 * we set the base URL for the API
 */

import axios from "axios";
import store from "../store";

export const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(
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
        if (
            error.response &&
            [403].includes(error.response.status)
        ) {
            // this.$toastr.e('Brak uprawnień');
        }
        return Promise.reject(error);
    }
);
