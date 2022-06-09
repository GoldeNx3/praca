import admin from "../../middleware/admin";

const adminRoutes = {
    path: "/admin",
    name: "admin",
    meta: {
        middleware: [admin],
        title: 'Dashboard',
    },
    redirect: '/admin/dashboard',
    component: () => import("../../layout/admin/index"),
    children: [
        {
            path: '/admin/profile',
            name: 'admin.profile',
            meta: {
                middleware: [admin],
                title: 'Profil użytkownika',
                icon: 'mdi-account',
                noBreadcrumb: true,
            },
            component: () => import("../../views/Admin/Profile/Settings")
        },
        {
            path: '/admin/posts',
            meta: {
                middleware: [admin],
                permission: 'show post',
                title: 'Aktualności',
                icon: 'mdi-newspaper',
                noBreadcrumb: true,
            },
            component: () => import("../../views/Admin/Post/Layout"),
            children: [
                {
                    path: 'create',
                    name: "admin.posts.create",
                    meta: {
                        middleware: [admin],
                        permission: 'create post',
                        title: 'Dodaj aktualność',
                        icon: 'mdi-plus',
                    },
                    component: () => import("../../views/Admin/Post/Create.vue"),
                },
                {
                    path: ':id',
                    props: true,
                    name: "admin.posts.show",
                    meta: {
                        middleware: [admin],
                        permission: 'show post',
                        title: 'Karta aktualności',
                        hidden: true,
                    },
                    redirect: '/admin/posts/:id',
                    component: () => import("../../views/Admin/Post/Index"),
                    children: [
                        {
                            path: 'edit',
                            name: "admin.posts.edit",
                            meta: {
                                middleware: [admin],
                                permission: 'create post',
                                title: 'Edytuj aktualność',
                                hidden: true,
                            },
                            component: () => import("../../views/Admin/Post/Edit"),
                        },
                        {
                            path: '/',
                            name: "admin.posts.summary",
                            meta: {
                                middleware: [admin],
                                permission: 'show post',
                                title: 'Podsumowanie',
                                hidden: true,
                            },
                            component: () => import("../../views/Admin/Post/Show"),
                        },
                    ]
                },
                {
                    path: '',
                    name: "admin.posts.list",
                    meta: {
                        middleware: [admin],
                        permission: 'show post',
                        title: 'Lista aktualności',
                        icon: 'mdi-view-list',
                        noBreadcrumb: true,
                    },
                    component: () => import("../../views/Admin/Post/List"),
                },
            ],
        },
    ]
}

export default adminRoutes;
