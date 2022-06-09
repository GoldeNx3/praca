<template>
    <div>
        <v-footer
            v-if="templates.footer"
            :class="templates.footer.options.class"
            :style="templates.footer.options.style"
        >
            <template v-for="(value, key) in templates.footer.content">
                <v-container
                    :key="key"
                    :fluid="value.container.fluid"
                    :style="value.container.style"
                    :class="value.container.class"
                >
                    <v-row class="mt-5 mb-5">
                        <template v-for="(v, i) in value.columns">
                            <v-col
                                :cols="v.cols"
                                :style="v.style"
                                :lg="v.lg"
                                :md="v.md"
                                :key="i"
                            >
                                <component v-bind="v.data" :is="v.component" />
                            </v-col>
                        </template>
                    </v-row>
                </v-container>
            </template>
        </v-footer>
        <!-- <v-footer
            class="py-3 mt-16"
            style="background-color: #e4f6fa; bottom: 0"
        >
            <v-container
                fluid
                class="p-0"
                style="max-width: 1040px; margin-top: 30px"
            >
                <v-row>
                    <v-col cols="12" lg="6">
                        <p class="primary--text">
                            Robert Sowa 516-961-205<br />
                            Gabriela Koza 500-142-747<br />
                            e-mail:
                            <a href="mailto:biuro@kolonieneptun.com"
                                >biuro@kolonieneptun.com</a
                            ><br />
                            ulica Sobieskiego 12, 41-300 Dąbrowa Górnicza
                        </p>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <p class="text-right mb-0">
                            <v-icon
                                class="mr-3 linkIcon"
                                @click="instagramUrl()"
                                >mdi-instagram</v-icon
                            >
                            <v-icon class="mr-3 linkIcon" @click="facebookUrl()"
                                >mdi-facebook</v-icon
                            >
                            <v-icon class="linkIcon" @click="youTubeUrl()"
                                >mdi-youtube</v-icon
                            >
                        </p>
                        <p class="small text-right overline m-0">
                            NeptunAPP &copy;2021
                        </p>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer> -->
    </div>
</template>

<script>
import TemplateService from "../../../services/TemplateService.js";
import { mapGetters } from "vuex";
import NewsletterComponent from "../../../components/Travel/Newsletter.vue";
import CarouselComponent from "../../../components/Travel/Carousel.vue";
import TextComponent from "../../../components/Travel/Text.vue";
import CategorySelectComponent from "../../../components/Travel/CategorySelect.vue";
import ImageComponent from "../../../components/Travel/Image.vue";
import NewsComponent from "../../../components/Travel/News.vue";
import SocialIconsComponent from "../../../components/Travel/SocialIcons.vue";
// import Editor from "../../../../plugins/tinymce";

const templateResource = new TemplateService();

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters("template", ["templates"]),
    },
    components: {
        NewsletterComponent,
        CarouselComponent,
        TextComponent,
        CategorySelectComponent,
        ImageComponent,
        NewsComponent,
        SocialIconsComponent,
    },
    methods: {
        postUrl(id) {
            this.$router.push({
                name: "travel.posts.list",
            });
        },

        homeUrl(id) {
            this.$router.push({
                name: "travel.dashboard",
            });
        },

        offerUrl() {
            this.goto("offers");
        },

        contactUrl() {
            this.$router.push({
                name: "travel.contact",
            });
        },

        neptunUrl() {
            window.open("https://plywanieneptun.com/", "_blank");
        },

        instagramUrl() {
            window.open("https://www.instagram.com/szkola_neptun/", "_blank");
        },

        facebookUrl() {
            window.open(
                "https://www.facebook.com/biuropodrozyneptun",
                "_blank"
            );
        },

        youTubeUrl() {
            window.open(
                "https://www.youtube.com/channel/UCSsRGdOe7EyH6ITzhxhXuuQ",
                "_blank"
            );
        },

        goto(id) {
            if (this.$route.name != "travel.dashboard") {
                this.$router.push({
                    name: "travel.dashboard",
                    params: { scrollTo: id },
                });
            } else {
                document.getElementById(id).scrollIntoView({
                    behavior: "smooth",
                });
            }
        },
    },
};
</script>

