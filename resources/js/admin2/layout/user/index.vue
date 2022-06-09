<template>
    <v-app id="inspire">
        <v-app-bar
            app
            color="white"
            flat
            >
            <v-container class="py-0 fill-height">
                <v-avatar
                    class="mr-10"
                    color="grey darken-1"
                    size="32"
                    ></v-avatar>

                <v-btn
                    v-for="link in links"
                    :key="link"
                    text
                    :to=" { name: 'user.profile' } "
                    >
                    {{ link }}
                </v-btn>

                <v-spacer></v-spacer>

                <v-responsive max-width="260">
                    <v-text-field
                        dense
                        flat
                        hide-details
                        rounded
                        solo-inverted
                        ></v-text-field>
                </v-responsive>
            </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-sheet rounded="lg">
                            <Sidebar />
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <router-view></router-view>
                        <!--  -->
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import { mapGetters } from "vuex";
    import Sidebar from './components/Sidebar/index';
    export default {
        name: "LayoutIndexUser",
        components: {
            Sidebar,
        },
        data: function () {
            return {
                drawer: null,
                breadcrumb: [],
                links: [
                    'Dashboard',
                    'Wiadomości',
                    'Profil',
                    'Powiadomienia',
                ],
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
