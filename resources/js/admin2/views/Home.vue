<template>
    <v-container>
        <h1><center>Neptun szkoła pływania</center></h1>
        <v-row>
            <v-col>
                Miejsce na rozbudowany tekst
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'
//    import AuthService from "../../../../services/AuthService";

    export default {
        name: 'Home',
        computed: {
            ...mapGetters("auth", ["authUser"]),
        },
        created() {
        }
    }
</script>
