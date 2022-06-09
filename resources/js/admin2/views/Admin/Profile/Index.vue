<template>
    <div>
        <v-card class="mb-5">
            <v-tabs>
                <v-tab
                    :to="{
                        name: 'admin.profile.settings',
                    }"
                    >Ustawienia</v-tab
                >
            </v-tabs>
        </v-card>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "AdminProfileIndex",
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>
