<template>
    <ValidationProvider :vid="vid" name="object" rules="required">
        <v-select
            hide-details="auto"
            :items="users"
            v-model="innerValue"
            item-text="name"
            item-value="id"
            label="Instruktor"
            persistent-hint
            outlined
            dense
            ></v-select>
    </ValidationProvider>
</template>

<script>
    import { ValidationProvider } from "vee-validate";
    import UserService from "../../services/UserService";


    export default {
        components: {
            ValidationProvider
        },
        props: {
            vid: {
                type: String
            },
            value: {
                type: null
            }
        },
        data: () => ({
                innerValue: '',
                users: [],
            }),
        watch: {
            innerValue(newVal) {
                this.$emit('input', newVal);
            },
            value(newVal) {
                this.innerValue = newVal;
            }
        },
        created() {
            if (this.value) {
                this.innerValue = this.value;
            }

            UserService.getModerators()
                    .then((response) => {
                        let data = response.data.data;
                        for (var key in data) {
                            this.users.push(data[key]);
                        }
                    })
                    .catch((error) => {
                        console.log('Failed get users data');
                    });
        }
    };
</script>
