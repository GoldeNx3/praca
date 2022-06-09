<template>
    <ValidationProvider :vid="vid" name="user" rules="required">
        <v-select
            hide-details="auto"
            :items="users"
            v-model="innerValue"
            item-text="name"
            item-value="id"
            label="Opiekun"
            persistent-hint
            outlined
            dense
            ></v-select>
    </ValidationProvider>
</template>

<script>
    import { ValidationProvider } from "vee-validate";
    import ObjectService from "../../services/ObjectService";
    const objectResource = new ObjectService();
    import { mapGetters } from "vuex";
    import store from "../../store/index";


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
        computed: {
            ...mapGetters("user", ["users"]),
        },
        data: () => ({
                innerValue: '',
                objects: [],
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

            store.dispatch("user/getUsers");
        }
    };
</script>
