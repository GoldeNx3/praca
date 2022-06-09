<template>
    <v-row justify="center">
        <v-dialog
            :value="value"
            @input="$emit('input', $event)"
            max-width="750px"
        >
            <ValidationObserver ref="obs">
                <form @submit.prevent="store">
                    <v-card>
                        <v-card-text class="m-0">
                            <v-container>
                                <span
                                    class="
                                        primary--text
                                        text-h4
                                        font-weight-bold
                                        text-center
                                    "
                                >
                                    {{ offer.name }}
                                </span>
                                <span class="subtitle-1 primary--text">
                                    <v-icon
                                        color="secondary"
                                        small
                                        class="mr-1 ml-2 mb-1"
                                    >
                                        mdi-calendar
                                    </v-icon>
                                    {{ offer.start_at }} do
                                    {{ offer.end_at }}
                                </span>
                                <v-divider></v-divider>
                                <v-row class="mt-5 mb-5">
                                    <v-col
                                        cols="12"
                                        class="text-center subtitle-1"
                                    >
                                        Dane dziecka
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.child.first_name"
                                            type="text"
                                            rules="required|min:2|max:30"
                                            label="Imię"
                                            vid="child_first_name"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.child.last_name"
                                            type="text"
                                            rules="required|min:2|max:30"
                                            label="Nazwisko"
                                            vid="child_last_name"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu
                                            v-model="group_menu_child_birthday"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <validation-provider
                                                    name="data urodzenia"
                                                    rules="required"
                                                    vid="child_birthday"
                                                >
                                                    <v-text-field
                                                        hide-details="auto"
                                                        slot-scope="{
                                                            errors,
                                                            valid,
                                                        }"
                                                        :error-messages="errors"
                                                        :success="valid"
                                                        v-model="
                                                            signup.child
                                                                .birthday
                                                        "
                                                        label="Data urodzenia"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        outlined
                                                        dense
                                                        :loading="loading"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </template>
                                            <v-date-picker
                                                v-model="signup.child.birthday"
                                                @input="
                                                    group_menu_child_birthday = false
                                                "
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.child.pesel"
                                            type="number"
                                            rules="required|numeric|min:11|max:11"
                                            label="PESEL"
                                            vid="child_pesel"
                                        />
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row class="mt-5 mb-5">
                                    <v-col
                                        cols="12"
                                        class="text-center subtitle-1"
                                    >
                                        Dane rodzica
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.first_name"
                                            type="text"
                                            rules="required|min:2|max:30"
                                            label="Imię rodzica"
                                            vid="first_name"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.last_name"
                                            type="text"
                                            rules="required|min:2|max:30"
                                            label="Nazwisko rodzica"
                                            vid="last_name"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.phone"
                                            type="text"
                                            rules="required|numeric|min:9|max:9"
                                            label="Numer telefonu rodzica"
                                            vid="phone"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <VInputWithValidation
                                            v-model="signup.email"
                                            type="text"
                                            rules="required|min:6|max:50"
                                            label="Adres e-mail"
                                            vid="email"
                                        />
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row class="mt-5 mb-5">
                                    <v-col
                                        cols="12"
                                        class="text-center subtitle-1"
                                    >
                                        Informacje dodatkowe (Możesz wpisać tutaj kod promocyjny)
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <VTextareaWithValidation
                                            v-model="signup.additional_info"
                                            rules="max:2000"
                                            label="informacje dodatkowe"
                                            vid="additional_info"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click.native="$emit('input', false)"
                            >
                                Zamknij
                            </v-btn>
                            <v-btn color="blue darken-1" text type="submit">
                                Zapisz się
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </form>
            </ValidationObserver>
        </v-dialog>

        <v-dialog :value="insuranceDialog" max-width="750px">
            <v-card>
                <v-card-text class="m-0 p-2">
                    <p class="success--text h3 text-center text-weight-bold">
                        Pomyślnie zapisano do oferty
                    </p>
                    <p class="text-center">
                        Wszystkie niezbędne dokumenty prosimy pobrać ze strony
                        oferty
                    </p>
                    <p class="text-center">
                        Jeżeli jesteś zainteresowany wykupieniem dodatkowego
                        ubezpieczenia, np. od kosztów rezygnacji, skorzystaj z
                        poniższego linku
                    </p>
                    <p class="text-center">
                        <v-btn
                            class="text-center"
                            color="success"
                            @click="insuranceClick()"
                        >
                            Zobacz warunki ubezpieczenia
                        </v-btn>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="insuranceDialog = false"
                    >
                        Zamknij
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <Loading
            text="Trwa zapisywanie do oferty... Proszę czekać"
            :dialog="loading"
        />
    </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import validation from "../../../validation/index";
import Loading from "../../../components/Travel/Loading.vue";
import OfferService from "../../../services/Travel/OfferService.js";
import VBtn from "../../inputs/VBtn.vue";

const offerResource = new OfferService();

export default {
    name: "OfferSignup",
    components: {
        ValidationProvider,
        ValidationObserver,
        Loading,
        VBtn,
    },
    props: {
        offer: {},
        value: "",
    },
    data() {
        return {
            // dialog: false,
            signup: {
                child: {
                    first_name: "",
                    last_name: "",
                    birthday: "",
                    pesel: "",
                },
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
            },
            group_menu_child_birthday: false,
            loading: false,
            insuranceDialog: false,
        };
    },
    computed: {},
    created() {},
    methods: {
        store() {
            this.loading = true;
            this.$refs.obs
                .validate()
                .then((valid) => {
                    if (valid) {
                        this.signup.offer_id = this.offer.id;
                        offerResource
                            .signup(this.signup)
                            .then((response) => {
                                this.$toastr.s(
                                    "Zostałeś zapisany pomyślnie. Na adres e-mail zostaną wysłane wszystkie niezbędne dokumenty"
                                );
                            })
                            .catch((error) => {
                                this.$refs.obs.setErrors(
                                    error.response.data.errors
                                );
                                this.$toastr.e("Błąd podczas walidacji danych");
                            })
                            .finally(() => {
                                this.loading = false;
                                this.dialog = false;
                                this.signup = {
                                    child: {
                                        first_name: "Jan",
                                        last_name: "Kowalski",
                                        birthday: "1994-07-21",
                                        pesel: "44546544444",
                                    },
                                    first_name: "Kamil",
                                    last_name: "Nowak",
                                    email: "test@kojarzeni.pl",
                                    phone: "111222333",
                                };
                                this.value = false;
                                this.insuranceDialog = true;
                            });
                    } else {
                        this.$toastr.e("Błędne dane formularza");
                        this.loading = false;
                        this.dialog = false;
                    }
                })
                .finally(() => {});
        },

        insuranceClick() {
            window.open(
                "https://w3.signal-iduna.pl/e-policy/pl/travel/?portal_code=www.kolonieneptun.com&ag_symbol=68401&tax_number=6443556001",
                "_blank"
            );
        },
    },
};
</script>
