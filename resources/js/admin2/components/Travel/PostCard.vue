<template>
    <div>
        <v-card outlined class="mb-5">
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="4" md="4" class="m-0 p-0">
                        <v-img
                            :src="'/img/travel/post_image/' + post.image"
                            class="grey lighten-2"
                            height="320"
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
                                    >{{ post.day }}

                                    {{ post.month }}
                                </span>
                            </div>
                        </v-img>
                    </v-col>
                    <v-col cols="12" lg="8" md="12" color="secondary">
                        <div class="ml-5">
                            <p class="h3 font-weight-bold">
                                <span>{{ post.title }}</span>
                            </p>
                            <span v-html="post.short_description"> </span>
                            <!-- <v-divider /> -->
                            <div
                                class="subtitle-1"
                                style="position: absolute; bottom: 0; right: 0"
                            >
                                <v-btn
                                    color="primary"
                                    @click="url(post.id)"
                                    small
                                    text
                                    >zobacz więcej</v-btn
                                >
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "PostCard",
    props: ["post"],
    data() {
        return {};
    },
    computed: {
        postImage() {
            // if (this.post.images.length > 0) {
            //     return this.post.images[0];
            // }
            return "";
        },
    },
    created() {},
    methods: {
        url(id) {
            this.$router.push({
                name: "travel.posts.show",
                params: { id: id },
            });
        },
    },
};
</script>
