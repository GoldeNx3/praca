<template>
    <div>
        <template v-if="templates.dashboard">
            <template v-for="(value, key) in templates.dashboard">
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
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../../store/index";
import Card from "../../components/Travel/Card";
import SideFilter from "../../components/Travel/SideFilter.vue";
import CategoryService from "../../services/Travel/CategoryService";
import CarouselService from "../../services/Travel/CarouselService";
import PostService from "../../services/PostService";
import CategoryCard from "../../components/Travel/CategoryCard.vue";
import NewsletterService from "../../services/Travel/NewsletterService";

import NewsletterComponent from "../../components/Travel/Newsletter.vue";
import CarouselComponent from "../../components/Travel/Carousel.vue";
import TextComponent from "../../components/Travel/Text.vue";
import CategorySelectComponent from "../../components/Travel/CategorySelect.vue";
import ImageComponent from "../../components/Travel/Image.vue";
import NewsComponent from "../../components/Travel/News.vue";

import * as moment from "moment/moment";

const categoryResource = new CategoryService();
const carouselResource = new CarouselService();
const postsResource = new PostService();
const newsletterResource = new NewsletterService();

export default {
    name: "TravelDashboard",
    metaInfo() {
        return {
            title: this.title,
            titleTemplate: "%s | Biuro Podróży NEPTUN",
            meta: [],
        };
    },
    computed: {
        ...mapGetters("template", ["dashboard", "templates"]),
    },
    data() {
        return {
            categories: [],
            carousel: [],
            posts: [],
            newsletterEmail: "",
            loading: false,
            title: "Strona główna",
        };
    },
    components: {
        Card,
        CategoryCard,
        SideFilter,

        NewsletterComponent,
        CarouselComponent,
        TextComponent,
        CategorySelectComponent,
        ImageComponent,
        NewsComponent,
    },
    created() {
        this.getCategories();
        this.getCarousel();
        this.getPosts();

        store.dispatch("template/getTemplates");
        store.dispatch("template/getDashboardTemplate");
    },
    updated() {
        this.$nextTick(function () {
            if (this.$route.params.scrollTo != undefined) {
                document
                    .getElementById(this.$route.params.scrollTo)
                    .scrollIntoView({
                        behavior: "smooth",
                    });
            }
        });
    },
    methods: {
        subscribe() {
            this.loading = true;
            newsletterResource
                .subscribe({ email: this.newsletterEmail })
                .then((response) => {
                    this.newsletterEmail = "";
                    if (response.data.message == "Success") {
                        this.$toastr.s(
                            "Pomyślnie zostałeś zapisany do newslettera"
                        );
                    }
                })
                .catch((error) => {
                    this.$toastr.e("Błędny adres e-mail");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getCategories() {
            categoryResource
                .getCategories()
                .then((response) => {
                    let data = response.data.data;
                    this.categories = data;
                })
                .catch((error) => {
                    console.log("Failed get categories data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        getCarousel() {
            carouselResource
                .get()
                .then((response) => {
                    let data = response.data.data;
                    this.carousel = data;
                })
                .catch((error) => {
                    console.log("Failed get carousel data");
                })
                .finally(() => {
                    this.loading = false;
                });
        },

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

        carouselClick(url) {
            this.$router.push(url);
        },

        postClick(id) {
            this.$router.push({
                name: "travel.posts.show",
                params: { id: id },
            });
        },

        url(name) {
            this.$router.push({
                name: "travel.offers",
                params: { categories: name },
            });
        },

        meta() {},

        // goto(refName) {
        //     var element = this.$refs[refName];
        //     var top = element.offsetTop;

        //     window.scrollTo(0, top);
        // },
    },
};
</script>

<style>
.bgCategory {
    background-image: url("/img/travel/bg_categories.png");
    background-color: #fff;
    background-size: cover;
    background-position: center;
}
.categoryName {
    text-shadow: 2px 2px 6px #000;
}
.link {
    cursor: pointer;
}
.v-card__text,
.v-card__title {
    word-break: normal;
}
</style>
