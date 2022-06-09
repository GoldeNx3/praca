<template>
    <v-container fluid>
        <ValidationObserver ref="obs">
            <v-card class="mx-auto" max-width="500">
                <v-card-title> Logowanie </v-card-title>
                <v-card-text>
                    <form @submit.prevent="login">
                        <v-row>
                            <v-col cols="12">
                                <validation-provider
                                    name="nazwa użytkownika"
                                    rules="required|min:6|max:50"
                                    vid="name"
                                >
                                    <v-text-field
                                        v-model="email"
                                        label="E-mail"
                                        outlined
                                        dense
                                        :loading="loading"
                                        hide-details="true"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="12">
                                <validation-provider
                                    name="hasło"
                                    rules="required"
                                    vid="password"
                                >
                                    <v-text-field
                                        v-model="password"
                                        label="Hasło"
                                        type="password"
                                        outlined
                                        dense
                                        hide-details="true"
                                        :loading="loading"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="d-flex" cols="12">
                                <v-btn
                                    color="success"
                                    type="submit"
                                    :loading="loading"
                                >
                                    Zaloguj się
                                </v-btn>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                            <v-col class="d-flex" cols="12">
                                <v-btn
                                    outlined
                                    color="green"
                                    :to="{ name: 'recruitment' }"
                                    >Zarejestruj uczestnika</v-btn
                                >
                            </v-col>
                        </v-row> -->
                    </form>
                </v-card-text>
            </v-card>
        </ValidationObserver>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "../services/AuthService";
import validation from "../validation/index";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: "LoginView",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            email: null,
            password: null,
            error: null,
            loading: false,
        };
    },
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
    mounted() {},
    created() {
        this.$store.dispatch("auth/getAuthUser").then(() => {
            let admin = AuthService.hasRole("admin");
            let moderator = AuthService.hasRole("moderator");
            if (this.authUser) {
                this.$store.dispatch("auth/setGuest", { value: "isNotGuest" });
                if (admin) {
                    this.$router.push("/admin");
                } else if (moderator) {
                    this.$router.push("/moderator");
                } else {
                    this.$router.push("/");
                }
            }
        });
    },
    methods: {
        async login() {
            const payload = {
                email: this.email,
                password: this.password,
            };

            try {
                this.loading = true;

                await AuthService.login(payload);
                const authUser = await this.$store.dispatch("auth/getAuthUser");

                let admin = AuthService.hasRole("admin");
                let moderator = AuthService.hasRole("moderator");

                if (authUser) {
                    this.$store.dispatch("auth/setGuest", {
                        value: "isNotGuest",
                    });
                    if (admin) {
                        this.$router.push("/admin");
                    } else if (moderator) {
                        this.$router.push("/moderator");
                    } else {
                        this.$router.push("/");
                    }

                    this.$toastr.s("Zostałeś zalogowany");
                    this.loading = false;
                } else {
                    this.$toastr.e("Wystąpił błąd, nie udało się zalogować");
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                for (var key in error.response.data.errors) {
                    this.$toastr.e(error.response.data.errors[key][0]);
                }
                this.$refs.obs.setErrors(error.response.data.errors);
            }
        },
    },
};
</script>
