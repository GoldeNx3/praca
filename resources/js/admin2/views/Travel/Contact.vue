<template>
    <v-container fluid style="width: 1040px" class="mt-10" v-if="!loading">
        <v-row>
            <v-col cols="12">
                <p class="h5 text-center text-uppercase">
                    <router-link :to="{ name: 'travel.dashboard' }"
                        >Strona główna</router-link
                    >
                    ->
                    <router-link :to="{ name: 'travel.contact' }"
                        >Kontakt</router-link
                    >
                </p>
                <hr />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h1 class="font-weight-bold text-center">
                    {{ contact.title }}
                </h1>
            </v-col>
            <v-col cols="4" offset="4" class="p-0">
                <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-row class="mt-10">
            <v-col offset="2" cols="8">
                <h2 v-html="contact.description"></h2>
            </v-col>
            <v-col cols="12">
                <hr />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PageService from "../../services/Travel/PageService.js";
const pageResource = new PageService();

export default {
    name: "TravelContact",
    data() {
        return {
            contact: {},
            loading: true,
        };
    },

    metaInfo() {
        return {
            title: "Kontakt",
            meta: [],
        };
    },

    created() {
        this.getContact();
    },

    methods: {
        getContact() {
            pageResource
                .show("kontakt")
                .then((response) => {
                    this.contact = response.data.data;
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
<style>
h2 {
    font-size: 14px !important;
}
</style>
