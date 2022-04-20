<template>
    <div id="app">
        <page-header></page-header>
        <div class="dgm_wrap">
            <router-view/>
        </div>
        <page-footer></page-footer>
    </div>
</template>

<script>
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import EventBus from "@/utils/event-bus";
import {setAuthInHeader} from "@/api/request";
import util from "@/mixins/util";
import {mapState} from "vuex";

export default {
    name: "App",
    mixins: [],
    components: {
        PageFooter,
        PageHeader
    },
    props: {},
    provide() {
        return {
            changeLoading: this.changeLoading,
        }
    },
    data() {
        return {
            loading: false,
            loadingText: '',
        }
    },
    created() {
        let token = this.$localStorage.get('token');
        if (!util.isEmpty(token)) {
            this.$store.dispatch('userInfo/setUserInfo', {token: token});
        }
    },
    mounted() {
        EventBus.$on('changeLoading', this.changeLoading)
        EventBus.$on('apiLoading', this.changeLoading)
        EventBus.$on('setProgress', this.setProgress);
    },
    beforeDestroy() {
        EventBus.$off('changeLoading')
        EventBus.$off('apiLoading')
        EventBus.$off('setProgress');
    },
    destroyed() {
    },
    computed: {},
    methods: {
        changeLoading(value, text = '') {
            this.loading = value;
            if (!value) {
                this.loadingText = '';
            } else {
                this.loadingText = text;
            }
            //return this.loading;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, 50)
            })
        },
        setProgress(value) {
            if (value === false) {
                this.uploading = false;
                this.progress = 0;
            } else if (value > 0) {
                this.uploading = true;
                this.progress = value;
            }
        },

    },
    watch: {},
}
</script>
<style lang="scss">
@import "assets/scss/index.scss";
</style>
