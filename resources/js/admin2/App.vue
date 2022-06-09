<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
    metaInfo: {
        // title: "Strona główna",
        // all titles will be injected into this template
        titleTemplate: "%s | Biuro Podróży NEPTUN",
    },
};
</script>

<style src="./styles/app.scss" lang="scss"/>
