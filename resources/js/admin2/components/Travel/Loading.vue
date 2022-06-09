<template>
    <v-dialog v-model="dialog" hide-overlay persistent width="400">
        <v-card color="primary" dark>
            <v-card-text>
                {{ text }}
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "LoadingComponent",
    props: ["dialog", "text"],
    data() {
        return {};
    },
};
</script>
