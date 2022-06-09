<template>
    <v-container fluid>
        <v-row class="justify-center align-center">
            <v-col cols="12" class="pb-0">
                <div class="mt-3">
                    <span class="h2 secondary--text text-uppercase">{{
                        post.title
                    }}</span>
                    <span class="subtitle-1 primary--text">
                        <v-icon color="primary" class="mr-1 ml-5">
                            mdi-calendar
                        </v-icon>
                    </span>
                    <span class="text-right">
                        {{ post.created_at }}
                    </span>
                </div>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-divider />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <span v-html="post.description"> </span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PostService from "../../services/PostService";
const postResource = new PostService();

export default {
    name: "TravelPostLayoutComponent",
    props: ["post", "loading"],
    data() {
        return {
            // currentImage: "",
        };
    },
    methods: {},
};
</script>
