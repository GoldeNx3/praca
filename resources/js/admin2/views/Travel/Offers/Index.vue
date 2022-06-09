<template>
    <div>
        <template v-if="mode == 'categories'">
            <v-container class="m-0 p-0" fluid fill-height>
                <v-img
                    v-if="currentCategory.background"
                    class="white--text align-end"
                    :height="currentCategory.background ? '350px' : ''"
                    :src="
                        '/img/travel/category_image/' +
                        currentCategory.background
                    "
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >
                    <div
                        class="w-50 m-auto d-flex align-center justify-center"
                        style="min-height: 350px"
                    >
                        <v-flex>
                            <h1
                                class="
                                    text-center text-white text-uppercase
                                    font-weight-bold
                                "
                            >
                                {{ currentCategory.name }}
                            </h1>
                            <div>
                                <p
                                    v-if="currentCategory.header"
                                    class="text-center text-white"
                                >
                                    {{ currentCategory.header }}
                                </p>
                                <p v-else class="text-center primary--text"></p>
                            </div>
                        </v-flex>
                    </div>
                </v-img>
                <v-flex v-else>
                    <h1
                        class="
                            mt-5
                            text-center
                            primary--text
                            text-uppercase
                            font-weight-bold
                        "
                    >
                        {{ currentCategory.name }}
                    </h1>
                    <div>
                        <p
                            v-if="currentCategory.header"
                            class="text-center primary--text"
                        >
                            {{ currentCategory.header }}
                        </p>
                        <p v-else class="text-center primary--text"></p>
                    </div>
                </v-flex>
            </v-container>
            <v-container style="max-width: 1040px" class="mt-5">
                <v-row>
                    <v-col cols="12">
                        <p
                            class="text-center primary--text mb-10"
                            v-if="currentCategory.description"
                        >
                            {{ currentCategory.description }}
                        </p>
                        <div
                            class="
                                text-caption
                                font-weight-bold
                                transition-swing
                            "
                        >
                            <h2>WYBIERZ KATEGORIE WIEKOWĄ</h2>
                            <v-divider class="primary"></v-divider>
                        </div>
                    </v-col>
                </v-row>

                <v-row class="m-auto">
                    <template v-for="category in categories">
                        <v-col cols="12" lg="6" md="12" :key="category.id">
                            <category-card :category="category" />
                        </v-col>
                    </template>
                </v-row>
            </v-container>
            <v-container
                fluid
                class="mt-6"
                style="background-color: #76cfe5"
                v-if="currentCategory.video"
            >
                <v-row class="p-4">
                    <v-col
                        cols="12"
                        lg="6"
                        offset-lg="3"
                        class="m-auto text-center"
                    >
                        <div
                            class="videoWrapper"
                            v-html="currentCategory.video"
                        ></div>
                    </v-col>
                </v-row>
            </v-container>
        </template>

        <template v-else-if="mode == 'pdf'">
            <v-container class="m-0 p-0" fluid fill-height>
                <v-img
                    class="white--text align-end"
                    height="350px"
                    width="100%"
                    :src="
                        '/img/travel/category_image/' +
                        currentCategory.background
                    "
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >
                    <div
                        class="w-50 m-auto d-flex align-center justify-center"
                        style="min-height: 350px"
                    >
                        <v-flex>
                            <h2
                                class="
                                    text-center text-white text-uppercase
                                    font-weight-bold
                                "
                            >
                                {{ currentCategory.name }}
                            </h2>
                            <div>
                                <p
                                    v-if="currentCategory.header"
                                    class="text-center text-white"
                                >
                                    {{ currentCategory.header }}
                                </p>
                                <p v-else class="text-center primary--text"></p>
                            </div>
                        </v-flex>
                    </div>
                </v-img>
                <v-container
                    fluid
                    style="max-width: 1040px"
                    class="m-auto p-0 mt-5"
                    fill-height
                >
                    <v-row>
                        <v-col cols="12">
                            <p>
                                <template
                                    v-for="(breadcrumb, id) in breadcrumbs"
                                >
                                    <span
                                        class="link"
                                        @click="$router.push(breadcrumb.url)"
                                        :key="id"
                                    >
                                        {{ breadcrumb.name }}
                                    </span>
                                    <template
                                        v-if="id + 1 < breadcrumbs.length"
                                    >
                                        ->
                                    </template>
                                </template>
                            </p>
                            <v-divider />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <p class="text-center primary--text mb-10">
                                {{ currentCategory.description }}
                            </p>
                            <div
                                class="
                                    text-caption
                                    font-weight-bold
                                    transition-swing
                                "
                            ></div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div class="text-center mb-5">
                                <v-pagination
                                    v-model="page"
                                    :length="numPages"
                                    :total-visible="7"
                                ></v-pagination>
                                <span class="float-right">
                                    Strona {{ page }} / {{ numPages }}
                                </span>
                            </div>
                            <div
                                v-if="loadedRatio > 0 && loadedRatio < 1"
                                style="
                                    background-color: green;
                                    color: white;
                                    text-align: center;
                                "
                                :style="{ width: loadedRatio * 100 + '%' }"
                            >
                                {{ Math.floor(loadedRatio * 100) }}%
                            </div>

                            <pdf
                                v-if="show"
                                ref="pdf"
                                style="border: 1px solid #6caad1"
                                :src="
                                    '/files/travel/categories/' +
                                    currentCategory.pdf_file
                                "
                                :page="page"
                                @progress="loadedRatio = $event"
                                @num-pages="numPages = $event"
                                @link-clicked="page = $event"
                            ></pdf>

                            <div class="text-center mt-5">
                                <span class="float-right">
                                    Strona {{ page }} / {{ numPages }}
                                </span>
                                <v-pagination
                                    v-model="page"
                                    :length="numPages"
                                    :total-visible="7"
                                ></v-pagination>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </template>

        <template v-else>
            <v-container
                class="m-0 p-0"
                fluid
                fill-height
                v-if="categoryBackground"
            >
                <v-img
                    class="white--text align-end"
                    height="350px"
                    :src="'/img/travel/category_image/' + categoryBackground"
                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >
                    <div
                        class="w-50 m-auto d-flex align-center justify-center"
                        style="min-height: 350px"
                    >
                        <v-flex>
                            <h2
                                class="
                                    text-center text-white text-uppercase
                                    font-weight-bold
                                "
                            >
                                {{ categoryName }}
                            </h2>
                            <div>
                                <p
                                    v-if="categoryHeader"
                                    class="text-center text-white"
                                >
                                    {{ categoryHeader }}
                                </p>
                                <p v-else class="text-center primary--text"></p>
                            </div>
                        </v-flex>
                    </div>
                </v-img>
            </v-container>
            <v-container style="max-width: 1040px" class="mt-10">
                <v-row>
                    <v-col cols="12">
                        <p>
                            <template v-for="(breadcrumb, id) in breadcrumbs">
                                <span
                                    class="link"
                                    @click="$router.push(breadcrumb.url)"
                                    :key="id"
                                >
                                    {{ breadcrumb.name }}
                                </span>
                                <template v-if="id + 1 < breadcrumbs.length">
                                    ->
                                </template>
                            </template>
                        </p>
                        <v-divider />
                    </v-col>
                    <v-col cols="6">
                        <v-subheader>
                            Znaleziono {{ offers.length }} ofert spełniających
                            kryteria</v-subheader
                        >
                    </v-col>
                    <v-col cols="3" offset="3">
                        <span class="text-right">
                            <v-select
                                dense
                                single-line
                                :items="items"
                                label="Sortuj od"
                            ></v-select>
                        </span>
                    </v-col>
                    <v-col cols="12">
                        <template v-for="item in offers">
                            <offer-card
                                :key="item.id"
                                :item="item"
                            ></offer-card>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </div>
</template>

<script>
import OfferService from "../../../services/Travel/OfferService";
import OfferCard from "../../../components/Travel/OfferCard.vue";
import OfferLayout from "../../../components/Travel/OfferLayout.vue";
import pdf from "vue-pdf";
import CategoryCard from "../../../components/Travel/CategoryCard.vue";

const offerResource = new OfferService();

export default {
    name: "OffersIndex",
    components: {
        "offer-card": OfferCard,
        CategoryCard,
        OfferLayout,
        pdf,
    },
    data() {
        return {
            items: ["Najpopularniejszych", "Najtańszych", "Najdroższych"],
            mode: "",
            categories: "",
            currentCategory: null,
            offers: [],
            page: 1,
            numPages: 0,
            src: "",
            loadedRatio: 0,
            show: true,
            dataLoaded: false,
            // title: "",
        };
    },
    metaInfo() {
        return {
            title: this.title,
            meta: [],
        };
    },
    created() {
        this.getData();
    },
    watch: {
        "$route.params.categories": function (id) {
            this.getData();
        },
    },
    computed: {
        title() {
            if (this.mode == "categories") {
                return "Wybór kategorii";
            } else if (this.mode == "pdf") {
                return this.currentCategory.name;
            } else {
                return this.categoryName;
            }
        },
        lastCategory() {
            return this.$route.params.categories;
        },
        categoryBackground() {
            if (this.dataLoaded) {
                if (this.currentCategory.ancestors.length > 0) {
                    return this.currentCategory.ancestors[0].background;
                }
                return this.currentCategory.background;
            }
        },
        categoryHeader() {
            if (this.dataLoaded) {
                if (this.currentCategory.ancestors.length > 0) {
                    return this.currentCategory.ancestors[0].header;
                }
                return this.currentCategory.header;
            }
        },
        categoryName() {
            if (this.dataLoaded) {
                if (this.currentCategory.ancestors.length > 0) {
                    return this.currentCategory.ancestors[0].name;
                }
                return this.currentCategory.name;
            }
        },

        breadcrumbs() {
            let bc = [
                {
                    name: "Strona główna",
                    url: {
                        name: "travel.dashboard",
                    },
                },
            ];
            if (this.dataLoaded) {
                if (this.currentCategory.ancestors.length > 0) {
                    bc.push({
                        name: this.currentCategory.ancestors[0].name,
                        url: {
                            name: "travel.offers",
                            params: {
                                categories:
                                    this.currentCategory.ancestors[0].slug,
                            },
                        },
                    });
                }
                bc.push({
                    name: this.currentCategory.name,
                    url: {
                        name: "travel.offers",
                        params: { categories: this.currentCategory.slug },
                    },
                });
                return bc;
            }
        },
    },
    methods: {
        getData() {
            offerResource.index(this.lastCategory).then((response) => {
                this.mode = response.data.mode;
                if (this.mode == "categories") {
                    this.categories = response.data.data[0];
                    this.currentCategory = response.data.currentCategory;
                } else {
                    this.offers = response.data.data;
                    this.currentCategory = response.data.currentCategory;
                }
                this.dataLoaded = true;
            });
        },
        url(name) {
            // let url = this.lastCategory + "/" + name;
            this.$router.push({
                name: "travel.offers",
                params: { categories: name },
            });
            this.getData();
        },
    },
};
</script>

<style>
.theme--light.v-divider {
    border: 2px solid #6caad1 !important;
    /* margin: 0px !important; */
    margin-top: 5px;
}

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

h2 {
    font-size: 14px !important;
}
</style>
