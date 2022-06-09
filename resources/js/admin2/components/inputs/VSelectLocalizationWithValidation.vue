<template>
    <ValidationProvider :vid="vid" name="localization_id" rules="required">
        <v-select
            hide-details="auto"
            :items="localizations"
            v-model="innerValue"
            item-text="name"
            item-value="id"
            label="Lokalizacja"
            persistent-hint
            outlined
            dense
            ></v-select>
    </ValidationProvider>
</template>

<script>
    import { ValidationProvider } from "vee-validate";
    import LocalizationService from "../../services/LocalizationService";
    const localizationResource = new LocalizationService();


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
                localizations: [],
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

            localizationResource.index()
                    .then((response) => {
                        let data = response.data.data;
                        for (var key in data) {
                            this.localizations.push(data[key]);
                        }
                    })
                    .catch((error) => {
                        console.log('Failed get roles data');
                    });
        }
    };
</script>
