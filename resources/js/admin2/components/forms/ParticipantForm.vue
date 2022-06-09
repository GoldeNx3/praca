<template>
    <div>
        <ValidationObserver ref="obs">

            <form @submit.prevent="$emit('on-submit', form)">
                <VSelectUserWithValidation v-model="form.user_id" vid="user_id" rules="required" />
                <v-divider></v-divider>
                <VInputWithValidation v-model="form.first_name" type="text" rules="required" label="Imię" vid="first_name" />
                <v-divider></v-divider>
                <VInputWithValidation v-model="form.last_name" type="text" rules="required" label="Nazwisko" vid="last_name" />
                <v-divider></v-divider>
                <VSelectLevelWithValidation v-model="form.level" rules="required" />
                <v-divider></v-divider>
                <VSelectWithValidation v-model="form.gender" rules="required" :items="[{id: 0, value: 'Mężczyzna'}, {id: 1, value: 'Kobieta'}]" label='Płeć uczestnika' />
                <v-divider></v-divider>
                <v-menu
                    v-model="menu_birthday"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            hide-details="auto"
                            v-model="form.birthday"
                            label="Data urodzenia"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                            ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.birthday"
                        @input="menu_birthday = false"
                        ></v-date-picker>
                </v-menu>
                <v-btn
                    small
                    class="mr-4 mt-5"
                    color="success"
                    type="submit"
                    >
                    Aktualizuj
                </v-btn>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import validation from "../../validation/index";
    import ParticipantService from "../../services/ParticipantService";
    const participantResource = new ParticipantService();
    export default {
    name: "ParticipantForm",
            components: {
            ValidationProvider,
                    ValidationObserver,
            },
            props: {
            participant: {
            type: Object
            },
                    loading: {
                    type: Boolean
                    },
            },
            data() {
    return {
    form: {
    user_id: this.participant?.user_id || "",
            first_name: this.participant?.first_name || "",
            last_name: this.participant?.last_name || "",
            level: this.participant?.level || "",
            gender: this.participant?.gender || "",
            birthday: this.participant?.birthday || "",
    },
            menu_birthday: false,
    }
    },
            computed: {
            },
            created() {
    },
    };
</script>
