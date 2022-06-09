<template>
    <div>
        <v-card class="mb-5">
            <v-tabs>
                <v-tab
                    :to="{
                        name: 'admin.posts.show',
                        params: { id: $route.params.id },
                    }"
                    >Podsumowanie</v-tab
                >
                <v-tab :to="{ name: 'admin.posts.edit' }">Edytuj</v-tab>
            </v-tabs>
        </v-card>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "AdminPostsIndex",
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>
