<template>
    <div class="header">
        <!-- 헤더 -->
        <div class="header_wrap">
        </div>
        <div class="header_menu_border">
            <div class="header_menu_wrap">
                <div class="header_menu">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {logout} from "@/mixins/Auth";
import {mapState} from "vuex";
import util from "@/mixins/util";
import EventBus from "@/utils/event-bus";
export default {
    name: "PageHeader",
    mixins: [],
    components: {},
    inject: [],
    provide() {
        return {}
    },
    props: {},
    data() {
        return {
        }
    },
    beforeRouterEnter() {
    },
    created() {
    },
    mounted() {
        EventBus.$on('PageHeaderForceUpdate',this.PageHeaderForceUpdate);
    },
    beforeDestroy() {
        EventBus.$off('PageHeaderForceUpdate');
    },
    destroyed() {
    },
    computed: {
    },
    methods: {
        movePage(url) {
            this.$router.push(url);
        },
        logout() {
            logout();
        },
        setData(key, value) {
            this[key] = value
        },
        PageHeaderForceUpdate(){
            this.$forceUpdate()
        }
    },
    watch: {
     /*   $route(to, from) {
            if (to.path != from.path) {
            }
        }*/

    },
}
</script>

<style scoped>

</style>
