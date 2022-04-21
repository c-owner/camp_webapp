<template>
  <div class="header">
    <!-- 헤더 -->
    <el-page-header @back="goBack">
      <div class="header_logo">
<!--        <img src="@/assets/logo/header_logo.png" />-->
<!--        <img src="../assets/logo/header_logo.png" alt=""/>-->
      </div>
    </el-page-header>
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
    return {}
  },
  beforeRouterEnter() {
  },
  created() {
  },
  mounted() {
    EventBus.$on('PageHeaderForceUpdate', this.PageHeaderForceUpdate);
  },
  beforeDestroy() {
    EventBus.$off('PageHeaderForceUpdate');
  },
  destroyed() {
  },
  computed: {},
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
    PageHeaderForceUpdate() {
      this.$forceUpdate()
    },
    goBack() {
      this.$router.back();
    },
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
