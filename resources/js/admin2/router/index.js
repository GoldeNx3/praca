import NProgress from 'nprogress';
import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from 'vue-meta';
import adminRoutes from './modules/admin';
import moderatorRoutes from './modules/moderator';
import userRoutes from './modules/user';
// import travelRoutes from './modules/travel';
import middlewarePipeline from "../router/middlewarePipeline";
import store from "../store/index";
Vue.use(VueRouter);
Vue.use(VueMeta);

import VueGtm from '@gtm-support/vue2-gtm';

Vue.use(VueGtm, {
    id: 'GTM-5LSMLS3', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    queryParams: {
        // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
        gtm_auth: 'gEXb7kQcXBOmM1oeHBF9f-EwgeG-aeWLBu7dxR8vd30',
        gtm_preview: 'env-4',
        gtm_cookies_win: 'x'
    },
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    nonce: '2726c7f26c', // Will add `nonce` to the script tag
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    ignoredViews: [], // Don't trigger events for specified router names (optional)
    trackOnNextTick: false // Whether or not call trackView in Vue.nextTick
});

const routes = [
    adminRoutes,
    moderatorRoutes,
    userRoutes,
    {
        path: "/",
        meta: {
            title: 'Home',
        },
        component: () => import("../layout/travel/index"),
        children: [
            {
                path: "admin_login",
                name: "login",
                component: () => import("../views/Login"),
            },
            {
                path: 'oferty/:categories',
                name: 'travel.offers',
                meta: {
                    title: 'Oferty',
                    icon: 'mdi-view-dashboard',
                    noBreadcrumb: true,
                },
                component: () => import("../views/Travel/Offers/Index"),
            },
            {
                path: 'aktualnosci',
                meta: {
                    title: 'Aktualności',
                    icon: 'mdi-view-dashboard',
                    noBreadcrumb: true,
                },
                component: () => import("../views/Travel/Posts/Index.vue"),
                children: [
                    {
                        path: ':id',
                        name: 'travel.posts.show',
                        meta: {
                            title: 'Aktualności',
                            icon: '',
                            noBreadcrumb: true,
                        },
                        component: () => import("../views/Travel/Posts/Show.vue"),
                    },
                    {
                        path: '',
                        name: "travel.posts.list",
                        meta: {
                            title: 'Aktualności',
                            icon: 'mdi-view-list',
                            noBreadcrumb: true,
                        },
                        component: () => import("../views/Travel/Posts/List.vue"),
                    },
                ]
            },
        ],
    },
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: () => import("../views/NotFound"),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

import AuthService from "../services/AuthService";

router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware;
    const permission = to.meta.permission;
    const context = { to, from, next, store };
    if (!middleware && !permission) {
        return next();
    }

    if (permission) {
        store.dispatch("auth/getAuthUser").then(() => {
            let perm = AuthService.hasPermission(permission);
            if (!perm) {
                next({ name: "notFound" });
            }
        });
    }

    middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});
export default router;
