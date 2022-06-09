<template>
    <v-row no-gutters>
        <v-col cols="12">
            <h3 class="text-center text-weight-bold">AKTUALNOŚCI</h3>
            <p class="text-justify">
                Poznaj najnowsze informacje dotyczące wyjazdów, koloni, obozów.
            </p>
        </v-col>
        <template v-for="n in posts">
            <v-col
                cols="12"
                lg="4"
                md="12"
                sm="12"
                :key="n.id"
                class="d-flex"
                style="flex-direction: column"
            >
                <v-card outlined class="mx-auto flex-grow-1" max-width="344">
                    <div style="height: 100%">
                        <v-img
                            @click="postClick(n.id)"
                            :src="'/img/travel/post_image/' + n.image"
                            class="link"
                            height="150px"
                        >
                            <div
                                style="
                                    background: #76cfe5;
                                    border-radius: 5px;
                                    padding: 3px;
                                "
                                class="float-right mr-1 mt-1"
                            >
                                <span
                                    class="
                                        font-weight-bold
                                        text-center
                                        white--text
                                        d-block
                                        subtitle-1
                                    "
                                    >{{ n.day }}

                                    {{ n.month }}
                                </span>
                            </div>
                        </v-img>

                        <v-card-title>
                            {{ n.title }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ n.short_description }}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-btn
                                class="secondary--text text-right"
                                @click="postClick(n.id)"
                                text
                            >
                                zobacz więcej
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-col>
        </template>
    </v-row>
</template>


<script>
import PostService from "../../services/PostService";
const postsResource = new PostService();
import * as moment from "moment/moment";

export default {
    name: "NewsComponent",
    data() {
        return {
            posts: [],
        };
    },
    // props: ["width", "image"],
    created() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            postsResource
                .get()
                .then((response) => {
                    let data = response.data.data;
                    this.posts = data;

                    this.posts.forEach(function (v, k) {
                        let date = moment(v.created_at);
                        v.day = date.format("Do");
                        v.month = date.format("MMMM");
                    });
                })
                .catch((error) => {
                    console.log("Failed get posts data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postClick(id) {
            this.$router.push({
                name: "travel.posts.show",
                params: { id: id },
            });
        },
    },
};
</script>
