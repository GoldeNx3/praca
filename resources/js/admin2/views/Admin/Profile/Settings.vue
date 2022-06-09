<template>
    <div>
        <v-card>
            <v-card-title class="pa-6 pb-3">
                <p>Nazwa użytkownika i e-mail</p>
            </v-card-title>
            <v-card-text>
                <ValidationObserver ref="obs">
                    <form @submit.prevent="update">
                        <v-row>
                            <v-col cols="5">
                                <VInputWithValidation
                                    v-model="name"
                                    type="text"
                                    rules="required|min:6|max:50"
                                    label="Nazwa użytkownika"
                                    vid="name"
                                    :loading="loading"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <VInputWithValidation
                                    v-model="email"
                                    type="text"
                                    rules="required|email|min:5"
                                    label="Adres e-mail"
                                    vid="email"
                                    :loading="loading"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-btn
                                    class="mr-4"
                                    color="success"
                                    type="submit"
                                    :loading="loading"
                                    small
                                >
                                    Aktualizuj
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </ValidationObserver>
            </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card>
            <v-card-title class="pa-6 pb-3">
                <p>Hasło</p>
            </v-card-title>
            <v-card-text>
                <ValidationObserver ref="obs2">
                    <form @submit.prevent="updatePassword">
                        <v-row>
                            <v-col cols="5">
                                <VInputWithValidation
                                    v-model="currentPassword"
                                    type="password"
                                    rules="required"
                                    label="Obecne hasło"
                                    vid="currentPassword"
                                    :loading="loading"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <VInputWithValidation
                                    v-model="password"
                                    type="password"
                                    rules="required"
                                    label="Nowe hasło"
                                    vid="password"
                                    ref="password"
                                    :loading="loading"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <VInputWithValidation
                                    v-model="passwordConfirm"
                                    type="password"
                                    rules="required|min:6|max:50|confirmed:password"
                                    label="Powtórz hasło"
                                    vid="passwordConfirm"
                                    ref="password"
                                    :loading="loading"
                                    dataVvAs="password"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-btn
                                    class="mr-4"
                                    color="success"
                                    type="submit"
                                    :loading="loading"
                                    small
                                >
                                    Aktualizuj
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </ValidationObserver>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "../../../services/AuthService";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import validation from "../../../validation/index";

export default {
    name: "AdminProfile",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            name: null,
            email: null,
            currentPassword: null,
            password: null,
            passwordConfirm: null,
            loading: false,
        };
    },
    created() {
        this.name = this.authUser.name;
        this.email = this.authUser.email;
    },
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
    methods: {
        update() {
            this.loading = true;
            this.$refs.obs
                .validate()
                .then((valid) => {
                    if (valid) {
                        const payload = {
                            name: this.name,
                            email: this.email,
                        };
                        AuthService.updateUser(payload)
                            .then(() => {
                                this.$store.dispatch("auth/getAuthUser");
                                this.$toastr.s(
                                    "Login i e-mail zostały zaktualizowane"
                                );
                            })
                            .catch((error) =>
                                this.$toastr.e("Błąd aktualizacji danych")
                            );
                    } else {
                        this.toastr.e("Błędne dane formularza");
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        updatePassword() {
            this.loading = true;
            this.$refs.obs2
                .validate()
                .then((valid) => {
                    if (valid) {
                        const payload = {
                            current_password: this.currentPassword,
                            password: this.password,
                            password_confirmation: this.passwordConfirm,
                        };
                        AuthService.updatePassword(payload)
                            .then(() =>
                                this.$toastr.s("Hasło zostało zaktualizowane")
                            )
                            .catch((error) =>
                                this.$toastr.e("Błąd aktualizacji hasła")
                            );
                    } else {
                        this.toastr.e("Błędne dane formularza");
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
