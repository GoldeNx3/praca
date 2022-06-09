<template>
    <div>
        <v-list color="transparent">
            <template v-for="route in routes">
                <v-list-item :key="route.title" link :to="route.path">
                    <v-list-item-content>
                        <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider class="my-2"></v-divider>

            <v-list-item
                link
                color="grey lighten-4"
                v-if="admin"
                @click="adminUrl"
                >
                <v-list-item-content>
                    <v-list-item-title>
                        Panel administratora
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                link
                color="grey lighten-4"
                v-if="moderator"
                @click="moderatorUrl"
                >
                <v-list-item-content>
                    <v-list-item-title>
                        Panel instruktora
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                link
                color="grey lighten-4"
                v-if="authUser"
                @click="logout"
                >
                <v-list-item-content>
                    <v-list-item-title>
                        Wyloguj
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list><!-- comment -->
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import userRoutes from '../../../../router/modules/user';
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
            userRoutes.children.forEach(route => {
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
            this.moderator = AuthService.hasRole('moderator');
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
            
            moderatorUrl() {
                this.$router.push({name: 'moderator.dashboard'});
            }
        },
    };
</script>
