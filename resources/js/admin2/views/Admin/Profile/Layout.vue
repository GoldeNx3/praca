<template>
    <v-container>
        <ValidationObserver ref="obs">
            <v-sheet rounded="lg">
                <v-card>
                    <v-card-text>
                        <form @submit.prevent="update">
                            <validation-provider
                                name="nazwa użytkownika"
                                rules="required|min:6|max:50"
                                vid="name"
                            >
                                <v-text-field
                                    slot-scope="{ errors, valid }"
                                    :error-messages="errors"
                                    :success="valid"
                                    v-model="name"
                                    label="Nazwa użytkownika"
                                    outlined
                                    required
                                ></v-text-field>
                            </validation-provider>
                            <validation-provider
                                name="adres e-mail"
                                rules="required|email|min:10|max:50"
                                vid="email"
                            >
                                <v-text-field
                                    slot-scope="{ errors, valid }"
                                    :error-messages="errors"
                                    :success="valid"
                                    v-model="email"
                                    label="Adres e-mail"
                                    outlined
                                    required
                                ></v-text-field>
                                <v-btn class="mr-4" type="submit">
                                    Aktualizuj
                                </v-btn>
                            </validation-provider>
                            <v-btn class="mr-4" type="submit">
                                Aktualizuj
                            </v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </ValidationObserver>
        <v-divider></v-divider>
        <ValidationObserver ref="obs2">
            <v-sheet rounded="lg">
                <v-card>
                    <v-card-text>
                        <form @submit.prevent="updatePassword">
                            <v-text-field
                                v-model="currentPassword"
                                label="Hasło obecne"
                                type="password"
                                outlined
                                required
                            ></v-text-field>
                            <validation-provider
                                name="hasło"
                                rules="required|min:6|max:50"
                                vid="password"
                            >
                                <v-text-field
                                    slot-scope="{ errors, valid }"
                                    :error-messages="errors"
                                    :success="valid"
                                    ref="password"
                                    v-model="password"
                                    label="Hasło"
                                    type="password"
                                    outlined
                                ></v-text-field>
                            </validation-provider>
                            <validation-provider
                                name="potwierdź hasło"
                                rules="required|min:6|max:50|confirmed:password"
                                vid="passwordConfirm"
                            >
                                <v-text-field
                                    slot-scope="{ errors, valid }"
                                    :error-messages="errors"
                                    :success="valid"
                                    data-vv-as="password"
                                    v-model="passwordConfirm"
                                    label="Powtórz hasło"
                                    type="password"
                                    outlined
                                ></v-text-field>
                            </validation-provider>
                            <v-btn class="mr-4" type="submit">
                                Aktualizuj
                            </v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </ValidationObserver>
    </v-container>
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
        };
    },
    created() {
        this.name = this.authUser.name;
        this.email = this.authUser.email;
    },
    methods: {
        update() {
            this.$refs.obs.validate().then((valid) => {
                if (valid) {
                    const payload = {
                        name: this.name,
                        email: this.email,
                    };
                    AuthService.updateUser(payload)
                        .then(() => this.$store.dispatch("auth/getAuthUser"))
                        .then(() =>
                            this.$toastr.s(
                                "Dane osobowe zostały zaktualizowane"
                            )
                        )
                        .catch((error) =>
                            this.$toastr.e("Błąd aktualizacji danych osobowych")
                        );
                } else {
                    this.toastr.e("Błędne dane formularza");
                }
            });
        },
        updatePassword() {
            this.$refs.obs2.validate().then((valid) => {
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
            });
        },
    },
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
};
</script>
