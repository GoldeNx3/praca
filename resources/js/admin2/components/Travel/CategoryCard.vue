<template>
    <v-hover v-slot="{ hover }">
        <v-card
            :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }"
            class="hover"
        >
            <v-img
                @click="url(category.slug)"
                class="white--text align-end"
                height="200px"
                :src="'/img/travel/category_image/' + category.image"
            >
                <v-card-title
                    class="text-h6 white--text font-weight-bold categoryName"
                >
                    {{ category.name }}
                </v-card-title>
            </v-img>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: "CategoryCardComponent",
    props: ["category"],
    data() {
        return {
            categories: [],
            carousel: [],
            posts: [],
        };
    },
    methods: {
        url(name) {
            // let url = this.lastCategory + "/" + name;
            this.$router.push({
                name: "travel.offers",
                params: { categories: name },
            });
            // this.getData();
        },
    },
};
</script>

<style>
.hover.v-card {
    transition: opacity 0.4s ease-in-out;
    transition: transform 0.2s; /* Animation */
    cursor: pointer;
    border: 1px solid #6caad1;
    transform: scale(1.05);
    z-index: inherit;
}

.hover.v-card:not(.on-hover) {
    opacity: 0.9;
    border: 1px solid #fff;
    transform: scale(1);
}

.show-btns {
    color: rgba(0, 0, 0, 1) !important;
}

.categoryName {
    text-shadow: 2px 2px 6px #000;
}
</style>
