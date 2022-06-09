<template>
    <div>
        <v-list dense nav>
            <template v-for="route in routes">
                <v-list-item v-if="!route.children" :key="route.title" link :to="route.path">
                    <v-list-item-icon>
                        <v-icon>{{ route.meta.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                    v-else
                    no-action
                    dense
                    color="white"
                    >
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>{{ route.meta.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <template v-for="child in route.children">
                        <v-list-item v-if="!child.meta.hidden" :to="route.path + '/' + child.path">
                            <v-list-item-icon>
                                <v-icon>{{ child.meta.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ child.meta.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-group>

            </template>                


        </v-list>
        <template>
            <div class="pa-2">
                <v-btn v-if="admin" block @click="adminUrl">
                    Panel administratora
                </v-btn><br />
                <v-btn block @click="userUrl">
                    Panel użytkownika
                </v-btn><br />
                <v-btn block @click="homeUrl">
                    Strona główna
                </v-btn><br />
                <v-btn v-if="authUser" block @click="logout">
                    Wyloguj
                </v-btn>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import moderatorRoutes from '../../../../router/modules/moderator';
    import AuthService from "../../../../services/AuthService";

    export default {
        name: "ModeratorSidebar",
        data: function () {
            return {
                routes: [],
                admin: false,
            }
        },
        created() {
            moderatorRoutes.children.forEach(route => {
                if (!route.meta.hidden) {
                    this.routes.push({
                        name: route.name,
                        path: route.path,
                        meta: route.meta,
                        children: route.children,
                    });
                }
            });

            this.admin = AuthService.hasRole('admin');
        },
        computed: {
            ...mapGetters("auth", ["authUser"]),
        },
        methods: {
            logout() {
                this.$store.dispatch("auth/logout");
            },
            adminUrl() {
                this.$router.push({name: 'admin.dashboard'});
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
