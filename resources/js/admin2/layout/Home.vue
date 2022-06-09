<template>
    <v-app id="inspire">
        <v-app-bar app color="white" flat>
            <v-container class="py-0 fill-height">
                <v-avatar
                    class="mr-10"
                    color="grey darken-1"
                    size="32"
                ></v-avatar>

                <v-btn
                    v-for="link in links"
                    :key="link.name"
                    text
                    :to="{ name: link.url }"
                >
                    {{ link.name }}
                </v-btn>

                <template> </template>

                <v-spacer></v-spacer>
            </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <v-container>
                <v-row>
                    <v-col>
                        <v-sheet rounded="lg">
                            <router-view></router-view>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "../services/AuthService";
export default {
    name: "HomeLayout",
    data: () => ({
        links: [
            {
                name: "Strona główna",
                url: "home",
            },
        ],
        admin: false,
        moderator: false,
        user: false,
    }),
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
    created() {
        this.$store.dispatch("auth/getAuthUser").then(() => {
            this.init();
        });

        let moderator = AuthService.hasRole("moderator");
    },
    methods: {
        init() {
            this.admin = AuthService.hasRole("admin");
            this.moderator = AuthService.hasRole("moderator");

            if (this.authUser) {
                this.links.push({
                    name: "Profil",
                    url: "user",
                });
            } else {
                this.links.push(
                    {
                        name: "Logowanie",
                        url: "login",
                    },
                    {
                        name: "Rejestracja",
                        url: "register",
                    },
                    {
                        name: "Rejestracja uczestnika",
                        url: "recruitment",
                    }
                );
            }

            if (this.admin) {
                this.links.push({
                    name: "Panel administratora",
                    url: "admin",
                });
            }
            if (this.moderator) {
                this.links.push({
                    name: "Panel instruktora",
                    url: "moderator",
                });
            }
            this.links.push({
                name: "Biuro podróży",
                url: "travel.dashboard",
            });
        },
    },
};
</script>
