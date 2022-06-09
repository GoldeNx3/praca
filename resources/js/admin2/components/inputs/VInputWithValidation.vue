<template>
    <validation-provider :name="$attrs.label" :rules="rules" :vid="vid">
        <v-text-field
            :type="$attrs.type"
            hide-details="auto"
            slot-scope="{ errors, valid }"
            :error-messages="errors"
            :success="valid"
            :label="$attrs.label"
            :loading="loading"
            v-model="innerValue"
            outlined
            dense
            :hint="hint"
            :data-vv-as="dataVvAs"
        ></v-text-field>
    </validation-provider>
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
        rules: {
            type: [Object, String],
            default: "",
        },
        // must be included in props
        value: {
            type: null,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        hint: {
            type: String,
            default: "",
        },
        dataVvAs: {
            type: String,
            default: "",
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
