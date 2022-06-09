<template>
    <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules">
        <v-select
            hide-details="auto"
            slot-scope="{ errors, valid }"
            :error-messages="errors"
            :success="valid"
            :items="items"
            v-model="innerValue"
            :label="$attrs.label"
            :loading="loading"
            persistent-hint
            outlined
            dense
        ></v-select>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
    components: {
        ValidationProvider,
    },
    props: {
        vid: {
            type: String,
        },
        // must be included in props
        value: {
            type: null,
        },
        items: {
            type: Array,
        },
        rules: {
            type: [Object, String],
            default: "",
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        innerValue: "",
    }),
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("input", newVal);
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal;
        },
    },
    created() {
        if (this.value) {
            this.innerValue = this.value;
        }
    },
};
</script>
