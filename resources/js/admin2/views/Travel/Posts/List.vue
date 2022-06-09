<template>
    <div>
        <template>
            <v-container style="max-width: 1040px" class="mt-10">
                <v-row>
                    <v-col>
                        <p class="small">Strona główna -> Aktualności</p>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <template v-for="(post, index) in posts">
                    <v-row :key="index">
                        <v-col :key="index">
                            <post-card :post="post"> </post-card>
                        </v-col>
                    </v-row>
                </template>
            </v-container>
        </template>
    </div>
</template>

<script>
import PostService from "../../../services/Travel/PostService";
import PostCard from "../../../components/Travel/PostCard.vue";
import * as moment from "moment/moment";

const postResource = new PostService();

export default {
    name: "TravelPostsList",
    components: {
        PostCard,
    },
    data() {
        return {
            posts: [],
        };
    },
    metaInfo() {
        return {
            title: "Aktualności",
            meta: [],
        };
    },
    created() {
        this.getData();
    },
    computed: {},
    methods: {
        getData() {
            postResource.index().then((response) => {
                this.posts = response.data.data;
                this.posts.forEach(function (v, k) {
                    let date = moment(v.created_at);
                    v.day = date.format("Do");
                    v.month = date.format("MMMM");
                });
            });
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
</style>
