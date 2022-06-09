<template>
    <div>
        <template v-if="title">
            <h5 class="card-title">{{ title }}</h5>
        </template>
        <v-row>
            <v-col cols="12">
                <v-simple-table :loading="loading" dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left pa-6">Imię</th>
                                <th class="text-left">Nazwisko</th>
                                <th class="text-left">Poziom</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td class="pa-6">{{ item.first_name }}</td>
                                <td>{{ item.last_name }}</td>
                                <td>{{ item.level }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: [
            "items",
            "title",
            "loading",
        ],
        data: function () {
            return {
            }
        },
        methods: {
        },
    };
</script>
<style>
    .v-card {
        background: #FF0000;
        padding-x: 10px;
    }
</style>

