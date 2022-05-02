<template>
    <div class="home">
      <top-main-banner-component></top-main-banner-component>
      <div class="main_bg">
        <b-button variant="primary">button</b-button>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import TopMainBannerComponent from "@/components/home/TopMainBannerComponent";
export default {
    name: "Home",
    mixins: [],
    components: {
      TopMainBannerComponent
    },
    inject: [],
    provide() {
        return{

        }
    },
    props: {
    },
    data() {
        return{

        }
    },
    beforeRouterEnter() {},
    created() {
    },
    mounted() {

    },
    beforeDestroy() {
    },
    destroyed() {},
    computed: {
    },
    methods:{

    },
    watch: {

    },
}
</script>
