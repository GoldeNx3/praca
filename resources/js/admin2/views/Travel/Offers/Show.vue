<template>
    <div>
        <v-container
            fluid
            style="max-width: 1040px"
            class="margin-auto"
            v-if="dataLoaded"
            fill-height
        >
            <v-container fluid>
                <v-row class="mb-5">
                    <v-col cols="12" class="pb-0">
                        <template v-for="(breadcrumb, id) in breadcrumbs">
                            <div class="d-inline" :key="id">
                                <span
                                    class="link small"
                                    @click="$router.push(breadcrumb.url)"
                                    :key="id"
                                >
                                    {{ breadcrumb.name }}
                                </span>
                                <template v-if="id + 1 < breadcrumbs.length">
                                    ->
                                </template>
                            </div>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
            <offer-layout
                :offer="offer"
                :loading="loading"
                :currentImage="currentImage"
            />
        </v-container>
    </div>
</template>

<script>
import VBtn from "../../../components/inputs/VBtn.vue";
import OfferService from "../../../services/Travel/OfferService";
import OfferLayout from "../../../components/Travel/OfferLayout.vue";
const offerResource = new OfferService();

export default {
    components: { VBtn, OfferLayout },
    name: "TravelOffersShow",
    data() {
        return {
            offer: {},
            currentImage: "",
            loading: true,
            dataLoaded: false,
        };
    },
    metaInfo() {
        return {
            title: this.offer.name,
            meta: [],
        };
    },
    created() {
        this.getOffer();
    },
    computed: {
        breadcrumbs() {
            let bc = [
                {
                    name: "Strona główna",
                    url: {
                        name: "travel.dashboard",
                    },
                },
            ];
            this.offer.categories.forEach((element) => {
                bc.push({
                    name: element.name,
                    url: {
                        name: "travel.offers",
                        params: {
                            categories: element.slug,
                        },
                    },
                });
            });
            return bc;
        },
    },
    methods: {
        getOffer() {
            offerResource
                .show(this.$route.params.id)
                .then((response) => {
                    this.offer = response.data.data;
                    if (this.offer.images.length > 0) {
                        this.currentImage = this.offer.images[0];
                    }
                    this.dataLoaded = true;
                })
                .catch((error) => {
                    console.log("Failed get object data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        setCurrentImage(id) {
            this.currentImage = this.offer.images[id];
        },
    },
};
</script>

<style>
.theme--light.v-divider {
    border: 2px solid #6caad1 !important;
    /* margin: 0px !important; */
    margin-top: 5px;
}

.link {
    cursor: pointer;
}

.link:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
