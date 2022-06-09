<template>
    <div>
        <ValidationObserver ref="obs">
            <form @submit.prevent="store" enctype="multipart/form-data">
                <post-create-component :post="post" :loading="loading" />
                <v-card class="mt-5">
                    <v-card-text>
                        <v-btn
                            small
                            type="submit"
                            color="success"
                            :loading="loading"
                        >
                            Dodaj aktualność
                        </v-btn>
                    </v-card-text>
                </v-card>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import validation from "../../../validation/index";
import draggable from "vuedraggable";
import PostService from "../../../services/PostService";
import PostCreateComponent from "../../../components/Travel/PostCreate.vue";

const postResource = new PostService();

export default {
    name: "AdminPostCreate",
    components: {
        ValidationProvider,
        ValidationObserver,
        PostCreateComponent,
        draggable,
    },
    data() {
        return {
            loading: false,
            post: {
                title: "",
                description: "",
                short_description: "",
                image: null,
                imgPreview: "",
            },
        };
    },
    created() {},
    methods: {
        store() {
            this.$refs.obs
                .validate()
                .then((valid) => {
                    this.loading = true;
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
                            .store(formData)
                            .then((response) => {
                                this.$toastr.s(
                                    "Aktualność została dodana pomyślnie"
                                );
                                this.$router.push({
                                    name: "admin.posts.show",
                                    params: { id: response.data.data.id },
                                });
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
    },
};
</script>
