<template>
    <v-app>
        <v-container class="p-0 m-0">
            <v-app-bar app color="white">
                <img
                    alt="Logo"
                    src="/img/travel/logo_neptun.png"
                    style="width: 150px; cursor: pointer"
                    class="mr-5"
                    @click="homeUrl()"
                />
                <v-spacer></v-spacer>
                <template v-if="$vuetify.breakpoint.xsOnly">
                    <v-app-bar-nav-icon
                        @click="drawer = true"
                        class="d-flex d-sm-none"
                    ></v-app-bar-nav-icon>
                </template>
                <template v-else>
                    <v-btn
                        class="font-weight-bold"
                        :to="{ name: 'travel.dashboard' }"
                        text
                        >Strona główna</v-btn
                    >
                    <v-btn class="font-weight-bold" @click="offerUrl()" text
                        >Oferta</v-btn
                    >
                    <v-btn @click="postUrl()" class="font-weight-bold" text
                        >Aktualności</v-btn
                    >
                    <v-btn class="font-weight-bold" @click="contactUrl()" text
                        >Kontakt</v-btn
                    >
                    <v-btn class="font-weight-bold" @click="neptunUrl()" text
                        >Szkoła pływania NEPTUN</v-btn
                    >
                </template>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" app>
                <v-layout justify-space-between column fill-height>
                    <v-list nav dense>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-title @click="homeUrl()"
                                    >Strona główna</v-list-item-title
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title @click="offerUrl()"
                                    >Oferta</v-list-item-title
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title @click="postUrl()"
                                    >Aktualności</v-list-item-title
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title @click="contactUrl()"
                                    >Kontakt</v-list-item-title
                                >
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title @click="neptunUrl()"
                                    >Szkoła pływania NEPTUN</v-list-item-title
                                >
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-layout>
            </v-navigation-drawer>
        </v-container>
        <v-main>
            <v-container fluid class="p-0 m-0">
                <v-slide-x-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-x-transition>
            </v-container>
        </v-main>
        <Footer></Footer>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import FilterComponent from "./../../components/Travel/FilterComponent";
import "../../styles/app.scss";
import Footer from "../../layout/travel/components/TheFooter.vue";

export default {
    name: "LayoutIndexTravel",
    components: {
        FilterComponent,
        Footer,
    },
    data: function () {
        return {
            drawer: false,
            breadcrumb: [],
            links: ["Dashboard", "Wiadomości", "Profil", "Powiadomienia"],
        };
    },
    computed: {},
    methods: {
        postUrl(id) {
            this.$router.push({
                name: "travel.posts.list",
            });
        },

        homeUrl(id) {
            this.$router.push({
                name: "travel.dashboard",
            });
        },

        offerUrl() {
            this.goto("offers");
        },

        contactUrl() {
            this.$router.push({
                name: "travel.contact",
            });
        },

        neptunUrl() {
            window.open("https://plywanieneptun.com/", "_blank");
        },

        instagramUrl() {
            window.open("https://www.instagram.com/szkola_neptun/", "_blank");
        },

        facebookUrl() {
            window.open(
                "https://www.facebook.com/biuropodrozyneptun",
                "_blank"
            );
        },

        youTubeUrl() {
            window.open(
                "https://www.youtube.com/channel/UCSsRGdOe7EyH6ITzhxhXuuQ",
                "_blank"
            );
        },

        goto(id) {
            if (this.$route.name != "travel.dashboard") {
                this.$router.push({
                    name: "travel.dashboard",
                    params: { scrollTo: id },
                });
            } else {
                document.getElementById(id).scrollIntoView({
                    behavior: "smooth",
                    lock: "nearest",
                    inline: "start",
                });
            }
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
};
</script>

<style scoped>
.v-text-field--outlined {
    color: rgba(192, 0, 250, 0.986);
}
.v-toolbar__content {
    border: 1px solid #ff0000 !important;
}
.linkIcon {
    cursor: pointer;
}
</style>
