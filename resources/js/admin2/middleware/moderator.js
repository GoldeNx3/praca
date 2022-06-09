import AuthService from "../services/AuthService";

export default function admin({ next, store }) {
    store.dispatch("auth/getAuthUser").then(() => {
        let role = AuthService.hasRole('moderator');
        if (role)
            next();
        else
            next({ name: "notFound" });
    });
}
