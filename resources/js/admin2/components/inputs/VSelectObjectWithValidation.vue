<template>
    <ValidationProvider :vid="vid" name="object" rules="required">
        <v-select
            hide-details="auto"
            :items="objects"
            v-model="innerValue"
            item-text="name"
            item-value="id"
            label="Basen"
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

            objectResource.index()
                    .then((response) => {
                        let data = response.data.data;
                        for (var key in data) {
                            this.objects.push(data[key]);
                        }
                    })
                    .catch((error) => {
                        console.log('Failed get roles data');
                    });
        }
    };
</script>
