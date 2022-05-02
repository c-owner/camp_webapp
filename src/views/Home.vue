<template>
    <div class="home">
<!--      <div class="main_bg">-->
<!--        <b-button variant="primary">button</b-button>-->
<!--      </div>-->
      <div id="main_fullbg">
        <div class="main_fullbg-wrap">
<!--      <top-main-banner-component></top-main-banner-component>-->
          <main-search-component></main-search-component>
        </div>
        <div class="mainwrap"></div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import MainSearchComponent from "@/components/home/MainSearchComponent";
export default {
    name: "Home",
    mixins: [],
    components: {
      MainSearchComponent,
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
