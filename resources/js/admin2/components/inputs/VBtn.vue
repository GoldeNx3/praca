<template>
    <v-btn
        :class="$attrs.class"
        :text="$attrs.text"
        :icon="$attrs.icon"
        :color="$attrs.color"
        @click="$emit('click')"
        dense
        >
        <slot />
    </v-btn>
</template>

<script>
    export default {
        components: {

        },
        props: {
        },
        data: () => ({

            }),
        watch: {
        },
        created() {
        }
    };
</script>
