<template>
    <span color="secodary">
        <template if="!route.meta.noBreadcrumb">
            <router-link v-if="!route.meta.bcDynamic" :to="{name: route.name}">
                {{route.meta.bcLinkText}} bcLinkText
            </router-link>
            <router-link v-if="route.meta.bcDynamic" :to= "{name: route.name, params: {id: $route.params.id}}">
                <template v-if="value">
                    {{formattedValue}}  formattedValue
                </template>
                <template v-if="!value">
                    {{loadingText}} loadingText
                </template>
            </router-link>
        </template>
    </span>
</template>

<script>
    export default {
        name: "Breadcrumbs",
        props: ['route'],
        computed: {
            formattedValue() {
                return this.route.meta.bcLinkText(this.value)
            },
            loadingText() {
                const loadingText = this.route.meta.bcLoadingText
                return loadingText ? loadingText : 'Loading...'
            }
        }
    };
</script>
