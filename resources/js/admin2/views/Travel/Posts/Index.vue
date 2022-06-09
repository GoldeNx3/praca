<template>
    <div>
        <v-container class="m-0 p-0" fluid fill-height>
            <v-img
                class="white--text align-end"
                height="350px"
                src="/img/travel/2.png"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            >
                <div
                    class="w-50 m-auto d-flex align-center justify-center"
                    style="min-height: 350px"
                >
                    <v-flex>
                        <h1
                            class="
                                text-center text-white text-uppercase
                                font-weight-bold
                            "
                        >
                            Aktualności
                        </h1>
                        <div>
                            <p class="text-center text-white"></p>
                        </div>
                    </v-flex>
                </div>
            </v-img>
        </v-container>
        <v-slide-x-transition mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </v-slide-x-transition>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    created() {},
    computed: {},
    methods: {},
};
</script>

<style>
.theme--light.v-divider {
    border: 2px solid #6caad1 !important;
    /* margin: 0px !important; */
    margin-top: 5px;
}
</style>
