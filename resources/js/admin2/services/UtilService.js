import * as API from "../services/API";
import Resource from "../services/resource";

class UtilService { //extends Resource {

    getStats() {
        return API.apiClient.get(`/api/util/stats`);
    }
}

export { UtilService as default };