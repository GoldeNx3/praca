import * as API from "../services/API";

/**
 * Simple RESTful resource class
 */
class Resource {
    constructor(uri) {
        this.uri = uri;
    }

    index() {
        return API.apiClient.get(`/api/${this.uri}`);
    }
    
    store(payload) {
        return API.apiClient.post(`/api/${this.uri}`, payload);
    }
    
    show(id) {
        return API.apiClient.get(`/api/${this.uri}/${id}`);
    }
    
    update(id, payload) {
        return API.apiClient.put(`/api/${this.uri}/${id}`, payload);
    }
    
    destroy(id) {
        return API.apiClient.delete(`/api/${this.uri}/${id}`);
    }
}

export { Resource as default };