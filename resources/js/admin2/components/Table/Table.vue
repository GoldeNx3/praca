<template>
    <div>
        <template v-if="title">
            <h5 class="card-title">{{ title }}</h5>
        </template>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Szukaj"
                    clearable
                    single-line
                    hide-details
                    ></v-text-field>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn
                    ali
                    small
                    v-if="button"
                    :color="button.color"
                    :to="{ name: button.url }"
                    >
                    {{ button.label }}
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"
                    :loading="loading"
                    :items-per-page="15"
                    loading-text="Ładowanie... Proszę czekać"
                    :item-class="itemClass"
                    >
                    <template slot="item.actions" slot-scope="data">
                        <slot name="item" v-bind="data"></slot>
                    </template>
                    <template 
                        v-for="column in customColumns" 
                        v-slot:[`item.${column.itemValue}`]="{ item }"
                        >
                        <slot :name="column.slotName" :item="item"/>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: [
            "headers",
            "items",
            "title",
            "loading",
            "button",
            "customColumns",
            "itemClass",
        ],
        data: function () {
            return {
                search: '',
            }
        },
        methods: {
        },
    };
</script>

