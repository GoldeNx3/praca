<template>
    <div>
        <v-card>
            <v-card-text>
                <post-layout :post="post" />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import VBtn from "../../../components/inputs/VBtn.vue";
import PostService from "../../../services/PostService";
import PostLayout from "../../../components/Travel/PostLayout.vue";
const postResource = new PostService();

export default {
    components: { VBtn, PostLayout },
    name: "AdminPostShow",
    data() {
        return {
            post: {},
            // currentImage: "",
            loading: true,
        };
    },
    created() {
        this.getPost();
    },
    methods: {
        getPost() {
            postResource
                .show(this.$route.params.id)
                .then((response) => {
                    this.post = response.data.data;
                })
                .catch((error) => {
                    console.log("Failed get object data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // setCurrentImage(id) {
        //     this.currentImage = this.offer.images[id];
        // },
    },
};
</script>

<style>
.theme--light.v-divider {
    border: 2px solid #6caad1 !important;
    /* margin: 0px !important; */
    margin-top: 5px;
}
</style>
