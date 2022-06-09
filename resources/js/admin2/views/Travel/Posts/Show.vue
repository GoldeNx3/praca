<template>
    <div>
        <template>
            <v-container
                fluid
                style="width: 1040px"
                class="mt-10"
                v-if="!loading"
            >
                <v-row>
                    <v-col cols="12">
                        <p class="h5 text-center text-uppercase">
                            <router-link :to="{ name: 'travel.dashboard' }"
                                >Strona główna</router-link
                            >
                            ->
                            <router-link :to="{ name: 'travel.posts.list' }"
                                >Aktualności</router-link
                            >
                            -> {{ post.title }}
                        </p>
                        <hr />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <h1 class="font-weight-bold text-center">
                            {{ post.title }}
                        </h1>
                    </v-col>
                    <v-col cols="4" offset="4" class="p-0">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        lg="2"
                        offset-lg="4"
                        class="p-0 m-auto text-center"
                    >
                        <v-chip color="primary">
                            {{ post.created_at }}
                        </v-chip>
                    </v-col>
                    <v-col cols="12" lg="2" class="p-0 m-auto text-center">
                        <v-chip color="secondary" class="text-center">
                            autor: administrator
                        </v-chip>
                    </v-col>
                </v-row>
                <v-row class="mt-10">
                    <v-col cols="12">
                        <v-img
                            class="white--text align-end"
                            height="350px"
                            :src="'/img/travel/post_image/' + post.image"
                        >
                        </v-img>
                    </v-col>
                    <v-col offset="2" cols="8">
                        <h3 v-html="post.description"></h3>
                    </v-col>
                    <v-col cols="12">
                        <hr />
                    </v-col>
                    <v-col cols="6">
                        <template v-if="prevPost">
                            <v-btn color="primary" @click="prevButton()"
                                >Poprzedni</v-btn
                            >
                        </template>
                    </v-col>
                    <v-col cols="6">
                        <template v-if="nextPost">
                            <v-btn
                                color="primary"
                                @click="nextButton()"
                                class="float-right"
                                >Następny</v-btn
                            >
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </div>
</template>

<script>
import PostService from "../../../services/Travel/PostService";

const postResource = new PostService();

export default {
    components: {},
    data() {
        return {
            post: {},
            prevPost: {},
            nextPost: {},
            loading: true,
        };
    },
    metaInfo() {
        return {
            title: this.post.title,
            meta: [],
        };
    },
    created() {
        this.getPost();
    },
    computed: {},
    methods: {
        getPost() {
            postResource
                .show(this.$route.params.id)
                .then((response) => {
                    this.post = response.data.data.post;
                    this.prevPost = response.data.data.prevPost;
                    this.nextPost = response.data.data.nextPost;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        prevButton() {
            this.$router.push({
                name: "travel.posts.show",
                params: { id: this.prevPost.id },
            });
        },

        nextButton() {
            this.$router.push({
                name: "travel.posts.show",
                params: { id: this.nextPost.id },
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
h3 {
    font-size: 16px !important;
}
</style>
