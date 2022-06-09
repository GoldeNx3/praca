<template>
    <v-container>
        <ValidationObserver ref="obs">
            <v-card elevation-0 max-width="500" class="mx-auto" slot-scope="{ invalid, validated }">
                <v-toolbar
                    dense
                    flat
                    >
                    <v-toolbar-title class="body-2">
                        <h4>Rejestracja</h4>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <form @submit.prevent="register">
                        <v-row>
                            <v-col cols="12" class="text-center">
                                <span>Masz już konto?</span>  
                                <v-btn
                                    color="primary"
                                    :to="{ name: 'login' }"
                                    x-small
                                    >
                                    Zaloguj się
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <validation-provider
                                    name="nazwa użytkownika"
                                    rules="required|min:6|max:50"
                                    vid="name"
                                    >
                                    <v-text-field
                                        slot-scope="{errors,valid}"
                                        :error-messages="errors"
                                        :success="valid"
                                        v-model="name"
                                        label="Nazwa użytkownika"
                                        outlined
                                        dense
                                        hide-details="auto"
                                        ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="12">
                                <validation-provider
                                    name="adres e-mail"
                                    rules="required|email|min:10|max:50"
                                    vid="email"
                                    >
                                    <v-text-field
                                        slot-scope="{errors,valid}"
                                        :error-messages="errors"
                                        :success="valid"
                                        v-model="email"
                                        label="Adres e-mail"
                                        outlined
                                        dense
                                        hide-details="auto"
                                        ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="12">
                                <validation-provider
                                    name="hasło"
                                    rules="required|min:6|max:50"
                                    vid="password"
                                    >
                                    <v-text-field
                                        slot-scope="{errors,valid}"
                                        :error-messages="errors"
                                        :success="valid"
                                        ref="password"
                                        v-model="password"
                                        label="Hasło"
                                        type="password"
                                        outlined
                                        dense
                                        hide-details="auto"
                                        ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="12">
                                <validation-provider
                                    name="potwierdź hasło"
                                    rules="required|min:6|max:50|confirmed:password"
                                    vid="passwordConfirm"
                                    >
                                    <v-text-field
                                        slot-scope="{errors,valid}"
                                        :error-messages="errors"
                                        :success="valid"
                                        data-vv-as="password"
                                        v-model="passwordConfirm"
                                        label="Powtórz hasło"
                                        type="password"
                                        outlined
                                        dense
                                        hide-details="auto"
                                        ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="d-flex" cols="12">
                                <v-btn
                                    color="success"
                                    type="submit"
                                    >
                                    Zarejestruj się
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </v-card-text>
            </v-card>
        </ValidationObserver>
    </v-container>
</template>

<script>
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import AuthService from "../services/AuthService";
    import validation from "../validation/index";
    export default {
        name: "RegisterView",
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                name: null,
                email: null,
                password: null,
                passwordConfirm: null,
            };
        },
        methods: {
            register() {
                this.$refs.obs.validate().then(valid => {
                    if (valid) {
                        const payload = {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.passwordConfirm,
                        };

                        AuthService.registerUser(payload)
                                .then(() => this.$router.push("/user"))
                                .then(() => this.$toastr.s("Zostałeś pomyślnie zarejestrowany"))
                                .catch((error) => {
                                    this.$refs.obs.setErrors(error.response.data.errors);
                                    this.$toastr.e("Formularz zawiera błędy walidacji");
                                });

                    } else {
                        this.$toastr.e("Formularz zawiera błędy walidacji");
                    }
                });
            },

            login() {
                this.$router.push({name: 'login'})
            }
        }
    };
</script>
