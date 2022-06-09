<template>
        <v-checkbox
            :label="$attrs.label"
            v-model="innerValue"
            dense
            hide-details="auto"
            ></v-checkbox>
</template>

<script>
    import { ValidationProvider } from "vee-validate";

    export default {
        components: {
            ValidationProvider
        },
        props: {
            vid: {
                type: String
            },
            rules: {
                type: [Object, String],
                default: ''
            },
            // must be included in props
            value: {
                type: null
            },
        },
        data: () => ({
                innerValue: ''
            }),
        watch: {
            // Handles internal model changes.
            innerValue(newVal) {
                this.$emit('input', newVal);
            },
            // Handles external model changes.
            value(newVal) {
                this.innerValue = newVal;
            }
        },
        created() {
            if (this.value) {
                this.innerValue = this.value;
            }
        }
    };
</script>