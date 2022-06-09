<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <VInputWithValidation
                            rules="required|min:3|max:50"
                            v-model="post.title"
                            type="text"
                            label="Tytuł aktualności"
                            vid="name"
                            :loading="loading"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-textarea
                            outlined
                            dense
                            v-model="post.short_description"
                            label="Krótki opis nagłówka"
                            rows="3"
                            hide-details="auto"
                        >
                        </v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <span> Treść aktualności </span>
                        <wysiwyg v-model="post.description" />
                    </v-col>
                    <v-col cols="6" offset="3">
                        <v-file-input
                            label="Zdjęcie aktualności"
                            prepend-icon="mdi-camera"
                            dense
                            outlined
                            hide-details="auto"
                            v-model="post.image"
                            @change="onImageChange"
                            @click:clear="deleteImage()"
                        ></v-file-input>
                        <div class="text-center m-auto">
                            <img
                                class="m-auto mt-5"
                                width="250"
                                :src="post.imgPreview"
                                @click="deleteImage()"
                            />
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import validation from "../../validation/index";
import draggable from "vuedraggable";
import PostService from "../../services/PostService";
import VBtn from "../inputs/VBtn.vue";

const postResource = new PostService();

export default {
    name: "AdminPostCreateComponent",
    components: {
        ValidationProvider,
        ValidationObserver,
        draggable,
        VBtn,
    },
    computed: {},
    props: {
        post: {},
        loading: false,
    },
    data() {
        return {
            imagePreview: this.post.imgPreview,
        };
    },
    created() {},
    methods: {
        onImageChange() {
            if (this.post.image == null) {
                return;
            }

            this.post.imgPreview = URL.createObjectURL(this.post.image);
        },

        deleteImage() {
            this.post.image = null;
            this.post.imagePreview = "";
        },
    },
};
</script>
