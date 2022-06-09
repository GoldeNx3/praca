<template>
    <div>
        <ValidationObserver ref="obs">
            <form @submit.prevent="$emit('on-submit', form)">

                <VInputWithValidation v-model="form.name" type="text" rules="required|min:6|max:50" label="Nazwa użytkownika" vid="name" />
                <v-divider></v-divider>
                <VInputWithValidation v-model="form.first_name" type="text" rules="required|min:6|max:30" label="Imię" vid="first_name" />
                <v-divider></v-divider>
                <VInputWithValidation v-model="form.last_name" type="text" rules="required|min:6|max:30" label="Nazwisko" vid="last_name" />
                <v-divider></v-divider>
                <VInputWithValidation v-model="form.email" type="text" rules="required|email" label="Adres e-mail" vid="email" />
                <v-divider></v-divider>
                <template>
                    <validation-provider
                        name="hasło"
                        rules="required|min:6|max:50"
                        vid="password"
                        >
                        <v-text-field
                            slot-scope="{errors,valid}"
                            :error-messages="errors"
                            hide-details="auto"
                            :success="valid"
                            ref="password"
                            v-model="form.password"
                            label="Hasło"
                            type="password"
                            outlined
                            dense
                            ></v-text-field>
                    </validation-provider>
                    <v-divider></v-divider>
                    <validation-provider
                        name="potwierdź hasło"
                        rules="required|min:6|max:50|confirmed:password"
                        vid="passwordConfirm"
                        >
                        <v-text-field
                            slot-scope="{errors,valid}"
                            :error-messages="errors"
                            hide-details="auto"
                            :success="valid"
                            data-vv-as="password"
                            v-model="form.passwordConfirm"
                            label="Powtórz hasło"
                            type="password"
                            outlined
                            dense
                            ></v-text-field>
                    </validation-provider>
                </template>
                <v-btn
                    class="mr-4 mt-5"
                    type="store"
                    >
                    Stwórz użytkownika
                </v-btn>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
        name: "CreateUserForm",
        components: {
        ValidationProvider,
            ValidationObserver,
        },
        props: {
            user: {
                type: Object,
            }
        },
        data() {
            return {
                form: {
                    name: this.user?.name || "",
                    first_name: this.user?.first_name || "",
                    last_name: this.user?.last_name || "",
                    email: this.user?.email || "",
                    password: '',
                    passwordConfirm: '',
                },
                loading: true,
            }
        },
        methods: {
        },
        computed: {
        },
        created() {
            var randomPassword = Math.random().toString(36).slice(-8);
            this.form.password = randomPassword;
            this.form.passwordConfirm = randomPassword;

            if (this.user.name == '') {
                this.form.name = this.user.first_name + '_' + this.user.last_name;
            }
        },
    };
</script>
