<template>
    <div id="app">
        <v-row>
            <v-col cols="12">
                <h1 class="text-h5">Panel Administratora</h1>
                <v-row>
                    <template v-for="tab in tabs">
                        <v-col cols="12" lg="3" :key="tab" class="shrink">
                            <v-expand-x-transition>
                                <v-card
                                    v-show="!loading"
                                    class="mx-1 mb-1"
                                    :color="tab.color"
                                >
                                    <v-card-title class="pa-6 pb-3">
                                        <p style="color: white">
                                            {{ tab.title }}
                                        </p>
                                    </v-card-title>
                                    <v-card-text class="pa-6 pt-0">
                                        <v-row no-gutters class="pb-5">
                                            <v-col cols="6">
                                                <span
                                                    class="
                                                        font-weight-small
                                                        text-h5
                                                    "
                                                    >{{ data[tab.value] }}</span
                                                >
                                            </v-col>
                                            <v-col cols="6" class="text-right">
                                                <v-icon x-large>
                                                    {{ tab.icon }}
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-expand-x-transition>
                        </v-col>
                    </template>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <SimpleTable
                            :loading="loading"
                            :items="data.participantsWoActivities"
                            title="Nieprzypisani uczestnicy"
                        >
                        </SimpleTable>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <SimpleTable
                            :loading="loading"
                            :items="data.awaitingEnrollments"
                            title="Oczekujący dodania"
                        >
                        </SimpleTable>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "../../services/AuthService";
import UtilService from "../../services/UtilService";

const utilResource = new UtilService();

export default {
    name: "AdminDashboard",
    methods: {},
    data: function () {
        return {
            tabs: [
                {
                    title: "Oczekujących",
                    value: "awaiting",
                    color: "primary",
                    icon: "mdi-av-timer",
                },
                {
                    title: "Liczba opiekunów",
                    value: "participants",
                    color: "secondary",
                    icon: "mdi-human-male-female",
                },
                {
                    title: "Liczba uczestników",
                    value: "users",
                    color: "textColor",
                    icon: "mdi-account-child",
                },
                {
                    title: "Dzisiejsze zajęcia",
                    value: "todayActivities",
                    color: "warning",
                    icon: "mdi-calendar-clock",
                },
            ],
            data: [],
            loading: true,
        };
    },
    created() {
        let admin = AuthService.hasRole("admin");
        let moderator = AuthService.hasRole("moderator");

        utilResource
            .getStats()
            .then((response) => {
                let data = response.data.data;
                this.data = data;
            })
            .catch((error) => {
                console.log("Failed get roles data");
            })
            .finally(() => {
                this.loading = false;
            });
    },
    mounted() {},
    computed: {
        ...mapGetters("auth", ["authUser"]),
    },
};
</script>
