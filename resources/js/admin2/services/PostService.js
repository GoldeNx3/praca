import * as API from "../services/API";
import Resource from "../services/resource";

class PostService extends Resource {
    constructor() {
        super('admin/posts');
    }

    /**
     * Get all posts
     * @returns
     */
    get() {
        return API.apiClient.get(`/api/posts/`);
    }

    /**
     * Update post
     * @param {*} id
     * @param {*} payload
     * @returns
     */
    update(id, payload) {
        return API.apiClient.post(`/api/${this.uri}/${id}`, payload);
    }
}

export { PostService as default };
