import admin from "../../middleware/admin";
import moderator from "../../middleware/moderator";
import auth from "../../middleware/auth";

const userRoutes = {
    path: "/user",
    name: "user",
    meta: {
        middleware: [auth],
        title: 'Dashboard',
    },
    redirect: '/user/dashboard',
    component: () => import("../../layout/user/index"),
    children: [
        {
            path: '/user/dashboard',
            name: 'user.dashboard',
            meta: {
                middleware: [auth],
                title: 'Dashboard',
                icon: 'mdi-view-dashboard',
                noBreadcrumb: true,
            },
            component: () => import("../../views/Auth/Dashboard"),

        },
        {
            path: '/user/profile',
            name: 'user.profile',
            meta: {
                middleware: [auth],
                title: 'Profil',
                icon: 'mdi-view-profile',
                noBreadcrumb: true,
            },
            component: () => import("../../views/Auth/Profile"),

        },
    ],
}

export default userRoutes;
