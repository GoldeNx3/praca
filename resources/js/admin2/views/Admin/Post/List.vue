<template>
    <div>
        <v-card>
            <v-card-text>
                <Table
                    :headers="headers"
                    :items="posts"
                    :loading="loading"
                    title="Aktualności"
                    :button="{
                        url: 'admin.posts.create',
                        label: 'Dodaj aktualność',
                        color: 'success',
                    }"
                >
                    <template v-slot:item="data">
                        <v-icon small class="mr-2" @click="show(data)">
                            mdi-eye
                        </v-icon>
                        <v-icon small class="mr-2" @click="edit(data)">
                            mdi-pencil
                        </v-icon>
                    </template>
                </Table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import PostService from "../../../services/PostService";
import * as moment from "moment/moment";

const postResource = new PostService();

export default {
    name: "AdminPostsList",
    data: function () {
        return {
            headers: [
                {
                    text: "ID",
                    align: "start",
                    sortable: false,
                    value: "id",
                },
                { text: "Tytuł", value: "title" },
                { text: "Dodano", value: "created_at" },
                { text: "Akcje", value: "actions", sortable: false },
            ],
            editedIndex: -1,
            posts: [],
            search: "",
            loading: true,
        };
    },
    created() {
        postResource
            .index()
            .then((response) => {
                let data = response.data.data;
                this.posts = data;
            })
            .catch((error) => {
                console.log("Failed get post data");
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        edit(item) {
            this.$router.push({
                name: "admin.posts.edit",
                params: { id: item.item.id },
            });
        },
        show(item) {
            this.$router.push({
                name: "admin.posts.show",
                params: { id: item.item.id },
            });
        },
    },
};
</script>
