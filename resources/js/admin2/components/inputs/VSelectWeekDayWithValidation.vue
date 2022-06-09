<template>
    <ValidationProvider vid="week_day" name="week_day" rules="">
        <v-select
            hide-details="auto"
            :items="week_days"
            v-model="innerValue"
            item-text="name"
            item-value="id"
            label="Dzień tygodnia"
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
                week_days: [
                    {id: 1, name: 'Poniedziałek'},
                    {id: 2, name: 'Wtorek'},
                    {id: 3, name: 'Środa'},
                    {id: 4, name: 'Czwartek'},
                    {id: 5, name: 'Piątek'},
                    {id: 6, name: 'Sobota'},
                    {id: 7, name: 'Niedziela'},
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
