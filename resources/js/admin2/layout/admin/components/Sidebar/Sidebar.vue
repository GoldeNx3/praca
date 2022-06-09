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
                <div :key="route.meta.title">
                    <template v-if="route.meta.section">
                        <v-subheader>{{ route.meta.section }}</v-subheader>
                    </template>
                    <template v-if="route.children && checkPermission(route)">
                        <v-list-group color="primary" append-icon="">
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
                            <template v-for="child in route.children">
                                <v-list-item
                                    v-if="route.children && !child.meta.hidden && checkPermission(child)"
                                    :key="child.meta.title"
                                    :to="route.path + '/' + child.path"
                                >
                                    <v-list-item-action>
                                        <v-icon size=""></v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
                                            {{ child.meta.title }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list-group>
                    </template>
                    <template v-else-if="checkPermission(route)">
                        <v-list-item color="primary" :to="route.path" link>
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
                    </template>
                </div>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import adminRoutes from "../../../../router/modules/admin";
import AuthService from "../../../../services/AuthService";
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
                    section: route.section ?? null,
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

        checkPermission(route) {
            if (!route.meta.permission || route.meta.permission == undefined) {
                // console.log(route);
                return true;
            }
            return AuthService.hasPermission(route.meta.permission);
        },

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

<style src="../../../../layout/admin/components/Sidebar/Sidebar.scss" lang="scss"/>
