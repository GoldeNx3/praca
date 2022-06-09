<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="3">
                    <VSelect label="Kierunek" />
                </v-col>
                <v-col cols="3">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        white
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                dark
                                v-model="dateRangeText"
                                label="Termin wyjazdu"
                                prepend-icon="mdi-calendar"
                                readonly
                                outlined
                                dense
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" range no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                                Anuluj
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="2">
                    <VSelect label="Wyjazd z" />
                </v-col>
                <v-col cols="2">
                    <VSelect label="Uczestnicy" />
                </v-col>
                <v-col cols="2">
                    <v-btn color="success" class="body-2 font-weight-bold w-100"
                        >Szukaj</v-btn
                    >
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import VSelect from "../inputs/VSelectWithValidation";
import VBtn from "../inputs/VBtn";

export default {
    name: "filterComponent",
    components: {
        VSelect,
        VBtn,
    },
    data() {
        return {
            date: ["2019-09-10", "2019-09-20"],
            menu: false,
            modal: false,
            menu2: false,
        };
    },
    computed: {
        dateRangeText() {
            return this.date.join(" do ");
        },
    },
};
</script>

<style scoped>
.v-text-field {
    color: #fff;
}
</style>
