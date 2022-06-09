<template>
    <v-navigation-drawer
        app
        clipped
        v-model="DRAWER_STATE"
        :mini-variant="!DRAWER_STATE"
        :width="sidebarWidth"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :temporary="$vuetify.breakpoint.smAndDown"
        :mini-variant-width="sidebarMinWidth"
        :class="{ 'drawer-mini': !DRAWER_STATE }"
    >
        <v-list>
            <template v-for="route in routes">
                <div :key="route.title">
                    <v-list-group
                        color="primary"
                        v-if="route.children"
                        append-icon=""
                    >
                        <template v-slot:prependIcon>
                            <v-icon size="28">{{ route.meta.icon }}</v-icon>
                        </template>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title class="grey--text">
                                    {{ route.meta.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="child in route.children"
                            :key="child.meta.title"
                            :to="route.path + '/' + child.path"
                        >
                            <template
                                v-if="route.children && !child.meta.hidden"
                            >
                                <v-list-item-action>
                                    <v-icon size=""></v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title class="grey--text">
                                        {{ child.meta.title }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                        color="primary"
                        v-else
                        :key="route.meta.title"
                        :to="route.path"
                        link
                    >
                        <v-list-item-action>
                            <v-icon
                                size="28"
                                :color="
                                    route.meta.color ? route.meta.color : ''
                                "
                                >{{ route.meta.icon }}</v-icon
                            >
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text" link>
                                {{ route.meta.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import adminRoutes from "../../../../../router/modules/travel/admin";
import AuthService from "../../../../../services/AuthService";
export default {
    props: {
        source: String,
    },
    data() {
        return {
            sidebarWidth: 300,
            sidebarMinWidth: 96,
            routes: [],
            breadcrumb: [],
        };
    },
    computed: {
        ...mapGetters("auth", ["authUser"]),
        ...mapState("util", ["drawer"]),
        DRAWER_STATE: {
            get() {
                return this.drawer;
            },
            set(newValue) {
                if (newValue === this.drawer) return;
                this.TOGGLE_DRAWER();
            },
        },
    },
    watch: {
        $route(to, from) {
            this.breadcrumb = [];
            this.$route.matched.forEach((route) => {
                if (!route.meta.noBreadcrumb) {
                    this.breadcrumb.push({
                        text: route.meta.title,
                        disabled: false,
                        to: { name: route.name },
                        exact: true,
                    });
                }
            });
        },
    },
    created() {
        adminRoutes.children.forEach((route) => {
            if (!route.meta.hidden) {
                this.routes.push({
                    name: route.name,
                    path: route.path,
                    meta: route.meta,
                    children: route.children,
                });
            }
        });

        this.breadcrumb = [];
        this.$route.matched.forEach((route) => {
            if (!route.meta.noBreadcrumb) {
                this.breadcrumb.push({
                    text: route.meta.title,
                    disabled: false,
                    to: { name: route.name },
                    exact: true,
                });
            }
        });
    },
    methods: {
        ...mapActions("util", ["TOGGLE_DRAWER"]),

        logout() {
            this.$store.dispatch("auth/logout");
        },
        moderatorUrl() {
            this.$router.push({ name: "moderator.dashboard" });
        },
        userUrl() {
            this.$router.push({ name: "user.dashboard" });
        },
        homeUrl() {
            this.$router.push({ name: "home" });
        },
    },
};
</script>


