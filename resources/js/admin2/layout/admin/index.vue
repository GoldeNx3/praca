<template>
    <v-app class="pa-6">
        <Header />
        <Sidebar />
        <v-main class="content">
            <v-container fluid>
                <v-breadcrumbs :items="breadcrumb" large></v-breadcrumbs>
                <router-view />
            </v-container>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
    import Header from '../../layout/admin/components/Header/Header';
    import Footer from '../../layout/admin/components/Footer/Footer';
    import Sidebar from '../../layout/admin/components/Sidebar/Sidebar';

    import { mapGetters } from "vuex";
    import adminRoutes from '../../router/modules/admin';
    import AuthService from "../../services/AuthService";
    import '../../layout/admin/Layout.scss';
    export default {
        name: "LayoutAdmin",
        components: {Header, Sidebar, Footer},
        data: function () {
            return {
                drawer: null,
                breadcrumb: [],
                routes: [],
                moderator: false,
            }
        },

        computed: {
            ...mapGetters("auth", ["authUser"]),
        },

        watch: {
            $route(to, from) {
                this.breadcrumb = [];
                this.$route.matched.forEach(route => {
                    if (!route.meta.noBreadcrumb) {
                        this.breadcrumb.push({text: route.meta.title, disabled: false, to: {name: route.name}, exact: true});
                    }
                });
            }
        },

        created() {
            this.moderator = AuthService.hasRole('moderator');

            this.breadcrumb = [];
            this.$route.matched.forEach(route => {
                if (!route.meta.noBreadcrumb) {
                    this.breadcrumb.push({text: route.meta.title, disabled: false, to: {name: route.name}, exact: true});
                }
            });
        },

        methods: {
            logout() {
                this.$store.dispatch("auth/logout");
            },
            moderatorUrl() {
                this.$router.push({name: 'moderator.dashboard'});
            },
            userUrl() {
                this.$router.push({name: 'user.dashboard'});
            },
            homeUrl() {
                this.$router.push({name: 'home'});
            },
        },
    };
</script>