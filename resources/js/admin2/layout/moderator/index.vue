<template>
    <v-app style="background: #c9c9c9;">
        <v-navigation-drawer v-model="drawer" dark app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        NeptunAPP
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Moderator Panel
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <Sidebar />
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-breadcrumbs :items="breadcrumb" large></v-breadcrumbs>
        </v-app-bar>

        <v-main>
            <v-container class="mb-16">
                <router-view></router-view>
            </v-container>
        </v-main>
        <v-footer inset height="100" class="mt-16">
            <v-container>
                <v-row justify="center">
                    <v-col lg="2" md="3" cols="12" align-self="center">
                        NeptunAPP
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>
    import { mapGetters } from "vuex";
    import Sidebar from './components/Sidebar/index';
    export default {
        name: "LayoutModerator",
        components: {
            Sidebar,
        },
        data: function () {
            return {
                drawer: null,
                breadcrumb: [],
            }
        },
        computed: {

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
            this.breadcrumb = [];
            this.$route.matched.forEach(route => {
                if (!route.meta.noBreadcrumb) {
                    this.breadcrumb.push({text: route.meta.title, disabled: false, to: {name: route.name}, exact: true});
                }
            });
        }
    };
</script>
