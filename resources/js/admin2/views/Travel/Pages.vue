<template>
    <v-container fluid style="width: 1040px" class="mt-10" v-if="!loading">
        <v-row>
            <v-col cols="12">
                <p class="h5 text-center text-uppercase">
                    <router-link :to="{ name: 'travel.dashboard' }"
                        >Strona główna</router-link
                    >
                    ->
                    {{ page.title }}
                </p>
                <hr />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h1 class="font-weight-bold text-center">
                    {{ page.title }}
                </h1>
            </v-col>
            <v-col cols="4" offset="4" class="p-0">
                <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-row class="mt-10">
            <v-col offset="2" cols="8">
                <span v-html="page.description"></span>
            </v-col>
            <v-col cols="12">
                <hr />
            </v-col>
        </v-row>
        <v-row class="mt-3" v-if="page.files && page.files.length > 0">
            <v-col cols="12">
                <div>
                    <p
                        class="
                            subtitle-1
                            m-0
                            p-0
                            text-uppercase
                            font-weight-bold
                        "
                    >
                        Pliki do pobrania
                    </p>
                    <v-divider />
                </div>
                <v-row>
                    <template v-for="(file, id) in page.files">
                        <v-col
                            :key="id"
                            cols="6"
                            lg="3"
                            @click="downloadFile(file.file, file.name)"
                        >
                            <v-icon color="primary" class="mr-2">
                                mdi-file-pdf
                            </v-icon>
                            <span class="link">
                                {{ file.name }}.{{ splitAttachment(file.file) }}
                            </span>
                        </v-col>
                    </template>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import validation from "../../validation/index";
import PageService from "../../services/Travel/PageService.js";
const pageResource = new PageService();

export default {
    name: "Pages",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: function () {
        return {
            page: {
                slug: "",
                title: "",
                description: "",
                active: true,
            },
            loading: true,
        };
    },
    mounted() {},
    watch: {},
    created() {
        this.getPage();
    },
    computed: {},
    methods: {
        getPage() {
            pageResource
                .show(this.$route.params.slug)
                .then((response) => {
                    let data = response.data.data;
                    this.page = data;
                })
                .catch((error) => {
                    console.log("Failed get page data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        splitAttachment(attachment) {
            let file = attachment.split(".");
            return file[file.length - 1];
        },

        downloadFile(file, name) {
            var extension = this.splitAttachment(file);
            pageResource.downloadAttachment(file).then((response) => {
                var type = "";
                if (extension == "txt") {
                    type = "text/plain";
                } else if (extension == "pdf") {
                    type = "application/pdf";
                } else if (extension == "doc") {
                    type = "application/msword";
                }
                let blob = new Blob([response.data], {
                    type: type,
                });
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = name + "." + extension;
                link.click();
            });
        },
    },
};
</script>

<style>
.link {
    cursor: pointer;
}
.link:hover {
    cursor: pointer;
    text-decoration: underline;
}
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    padding-top: 25px;
    height: 0;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
