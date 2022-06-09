<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" dark app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        NeptunAPP
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Admin Panel
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.url">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn v-if="authUser" block @click="logout">
                        Wyloguj
                    </v-btn>
                    <v-btn v-else block to="login">
                        Zaloguj
                    </v-btn>
                </div>
                <div class="pa-2">
                    <v-btn v-if="!authUser" block to="register">
                        Zarejestruj
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-container>
            <v-main>
                <v-row class="mt-5 mb-5">
                    <v-card width="100%" class="d-flex flex-row mx-3">
                        <v-card-text>
                            <router-view></router-view>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-main>
        </v-container>
    </v-app>
</template>

<script>
    import { mapGetters } from "vuex";
    import AuthService from "../services/AuthService";

    export default {
        name: "app",
        data: function () {
            return {
                drawer: null,

                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/admin'},
                    {title: 'Profil', icon: 'mdi-face-profile', url: '/admin/user'},
                    {title: 'Użytkownicy', icon: 'mdi-human-male-female', url: '/admin/users'},
                    {title: 'Lokalizacje', icon: 'mdi-earth', url: '/admin/localizations'},
                ],
            }
        },
        created() {
        },
        computed: {
            ...mapGetters("auth", ["authUser"]),
        },
        methods: {
            logout() {
                this.$store.dispatch("auth/logout");
            },
        },
    };
</script>
