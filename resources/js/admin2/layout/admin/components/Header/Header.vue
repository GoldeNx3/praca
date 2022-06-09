<template>
    <v-app-bar class="main-header" height="64" fixed color="primary" dark>
        <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
            <template v-if="DRAWER_STATE">
                <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
            </template>
            <template v-else>
                <v-icon style="font-size: 28px">mdi-menu</v-icon>
            </template>
        </v-btn>
        <v-toolbar-title>NeptunAPP</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu min-width="250" offset-y bottom left nudge-bottom="10">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-0" icon v-bind="attrs" v-on="on">
                    <v-icon style="font-size: 28px"> mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list>
                <div class="d-flex justify-center my-3">
                    <v-btn
                        width="80%"
                        medium
                        color="warning"
                        class="text-capitalize"
                        @click="profileUrl"
                        >Profil użytkownika
                    </v-btn>
                </div>
                <div class="d-flex justify-center my-3">
                    <v-btn
                        width="80%"
                        medium
                        color="primary"
                        class="text-capitalize"
                        v-if="moderator"
                        @click="moderatorUrl"
                        >Panel moderatora
                    </v-btn>
                </div>
                <div class="d-flex justify-center my-3">
                    <v-btn
                        width="80%"
                        medium
                        color="primary"
                        class="text-capitalize"
                        @click="userUrl"
                        >Panel użytkownika
                    </v-btn>
                </div>
                <div class="d-flex justify-center my-3">
                    <v-btn
                        width="80%"
                        medium
                        color="primary"
                        class="text-capitalize"
                        @click="homeUrl"
                        >Strona główna
                    </v-btn>
                </div>
                <div class="d-flex justify-center my-3">
                    <v-btn
                        width="80%"
                        medium
                        color="error"
                        class="text-capitalize"
                        @click="logOut"
                        >Wyloguj
                    </v-btn>
                </div>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import config from "../../../../config";
import AuthService from "../../../../services/AuthService";

export default {
    name: "Header",
    data: () => ({
        config,
        searchCollapse: true,
        notifications: [
            {
                text: "Check out this awesome ticket",
                icon: "mdi-tag",
                color: "warning",
            },
            {
                text: "What is the best way to get ...",
                icon: "mdi-thumb-up",
                color: "success",
            },
            {
                text: "This is just a simple notification",
                icon: "mdi-flag",
                color: "error",
            },
            {
                text: "12 new orders has arrived today",
                icon: "mdi-cart",
                color: "primary",
            },
        ],
        messages: [
            {
                text: "JH",
                name: "Jane Hew",
                message: "Hey! How is it going?",
                time: "09:32",
                color: "warning",
            },
            {
                text: "LB",
                name: "Lloyd Brown",
                message: "Check out my new Dashboard",
                time: "10:02",
                color: "success",
            },
            {
                text: "MW",
                name: "Mark Winstein",
                message: "I want rearrange the appointment",
                time: "12:16",
                color: "error",
            },
            {
                text: "LD",
                name: "Liana Dutti",
                message: "Good news from sale department",
                time: "14:56",
                color: "primary",
            },
        ],
        account: [
            { text: "Profil", icon: "mdi-account", color: "textColor" },
            { text: "Zajęcia", icon: "mdi-thumb-up", color: "textColor" },
            { text: "Wiadomości", icon: "mdi-flag", color: "textColor" },
        ],
        notificationsBadge: true,
        messageBadge: true,
        moderator: false,
    }),
    computed: {
        ...mapState("util", ["drawer"]),
        ...mapGetters("auth", ["authUser"]),
        DRAWER_STATE: {
            get() {
                return this.drawer;
            },
        },
    },
    created() {
        this.moderator = AuthService.hasRole("moderator");
    },
    methods: {
        ...mapActions("util", ["TOGGLE_DRAWER"]),
        logOut: function () {
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
        profileUrl() {
            this.$router.push({ name: "admin.profile" });
        },
    },
};
</script>

<style src="../../../../layout/admin/components/Header/Header.scss" lang="scss"></style>
