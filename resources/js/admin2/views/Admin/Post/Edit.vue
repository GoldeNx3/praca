<template>
    <div>
        <ValidationObserver ref="obs">
            <v-card class="mb-5">
                <v-card-text>
                    <v-btn
                        small
                        :loading="loading"
                        color="error"
                        @click="deletePost"
                    >
                        Usuń aktualność
                    </v-btn>
                </v-card-text>
            </v-card>
            <form @submit.prevent="update" enctype="multipart/form-data">
                <post-create-component :post="post" :loading="loading" />
                <v-card class="mt-5">
                    <v-card-text>
                        <v-btn
                            small
                            type="submit"
                            color="success"
                            :loading="loading"
                        >
                            Aktualizuj aktualność
                        </v-btn>
                    </v-card-text>
                </v-card>
            </form>
        </ValidationObserver>

        <v-dialog v-model="dialogDelete" max-width="700px">
            <v-card>
                <v-card-title>
                    Usuwanie aktialności {{ post.title }}
                </v-card-title>
                <v-card-text>
                    <p>Czy jesteś pewny, że chcesz usunąć tą aktualność?</p>
                    <p color="error">
                        Usunięcie aktualności jest nieodwracalne
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="closeDelete">Anuluj</v-btn>
                    <v-btn color="error" @click="deleteItemConfirm">Usuń</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import validation from "../../../validation/index";
import draggable from "vuedraggable";
import PostService from "../../../services/PostService";
import PostCreateComponent from "../../../components/Travel/PostCreate";
import VBtn from "../../../components/inputs/VBtn.vue";

const postResource = new PostService();
export default {
    name: "AdminPostEdit",
    components: {
        ValidationProvider,
        ValidationObserver,
        PostCreateComponent,
        draggable,
        VBtn,
    },
    data() {
        return {
            post: {
                title: "",
                description: "",
                short_description: "",
                image: null,
                imgPreview: null,
            },
            // imagePreview: null,
            loading: true,
            dialogDelete: false,
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
                    // this.imagePreview =
                    //     "/img/travel/post_image/" + response.data.data.image;
                    this.post = response.data.data;
                    this.post.imgPreview =
                        "/img/travel/post_image/" + this.post.image;
                    this.post.image = null;
                })
                .catch((error) => {
                    console.log("Failed get object data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        update() {
            this.loading = true;
            this.$refs.obs
                .validate()
                .then((valid) => {
                    if (valid) {
                        let formData = new FormData();
                        formData.append("title", this.post.title);
                        formData.append("description", this.post.description);
                        formData.append(
                            "short_description",
                            this.post.short_description
                        );
                        formData.append("image", this.post.image);
                        postResource
                            .update(this.$route.params.id, formData)
                            .then((response) => {
                                this.$toastr.s(
                                    "Aktualność została zaktualizowana pomyślnie"
                                );
                                // this.$router.push({name: 'admin.category.show', params: {id: response.data.id}});
                            })
                            .catch((error) => {
                                this.$refs.obs.setErrors(
                                    error.response.data.errors
                                );
                                this.$toastr.e("Błąd podczas walidacji danych");
                            })
                            .finally(() => {
                                this.loading = false;
                            });
                    } else {
                        this.toastr.e("Błędne dane formularza");
                        this.loading = false;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        deletePost() {
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            postResource
                .destroy(this.$route.params.id)
                .then((response) => {
                    this.$toastr.s("Aktualność została usunięta");
                    this.dialogDelete = false;
                    this.$router.push({ name: "admin.posts.list" });
                })
                .catch((error) => {
                    this.$toastr.e("Błąd w usuwaniu aktualności");
                })
                .finally(() => {
                    this.dialogDelete = false;
                    this.loading = false;
                });
        },

        close() {
            this.dialogDelete = false;
        },

        closeDelete() {
            this.dialogDelete = false;
        },
    },
};
</script>
