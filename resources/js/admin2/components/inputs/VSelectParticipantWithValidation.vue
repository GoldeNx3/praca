<template>
    <ValidationProvider vid="participant" name="participant" rules="">
        <v-select
            hide-details="auto"
            :items="participants"
            v-model="innerValue"
            :item-text="participants => participants.first_name + ' ' + participants.last_name + ' [Opiekun: ' + participants.user.full_name + ']'"
            item-value="id"
            label="Uczestnik"
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
    
    import ParticipantService from "../../services/ParticipantService";
    const participantResource = new ParticipantService();


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
                participants: [],
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

            participantResource.index()
                    .then((response) => {
                        let data = response.data.data;
                        for (var key in data) {
                            this.participants.push(data[key]);
                        }
                    })
                    .catch((error) => {
                        console.log('Failed get participants data');
                    });
        }
    };
</script>
