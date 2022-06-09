<template>
    <ValidationProvider vid="level" name="level" rules="required">
        <v-select
            hide-details="auto"
            :items="levels"
            v-model="innerValue"
            item-text="value"
            item-value="id"
            label="Poziom"
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
            ValidationProvider
        },
        props: {
            vid: {
                type: String
            },
            // must be included in props
            value: {
                type: null
            }
        },
        data: () => ({
                innerValue: '',
                levels: [
                    {id: 0, value: 'Początkujący'},
                    {id: 1, value: 'Średniozaawansowany'},
                    {id: 2, value: 'Zaawansowany'},
                ],
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
