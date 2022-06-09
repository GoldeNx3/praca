import * as API from "../../services/API";
import resource from "../resource";

/**
 * Simple RESTful resource class
 */
class PostService {
    index() {
        return API.apiClient.get('/api/posts/get');
    }

    latest() {
        return API.apiClient.get('/api/posts');
    }

    show(id) {
        return API.apiClient.get(`/api/posts/${id}/show`);
    }
}

export { PostService as default };
