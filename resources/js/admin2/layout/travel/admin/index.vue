<template>
    <v-app class="pa-6"> </v-app>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
    name: "LayoutTravelAdmin",
    data: function () {
        return {};
    },

    components: {Header, Sidebar, Footer},

    computed: {
        ...mapGetters("auth", ["authUser"]),
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
        this.moderator = AuthService.hasRole("moderator");

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

    methods: {},
};
</script>
