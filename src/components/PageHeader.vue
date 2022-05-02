<template>
  <div class="header">
    <!-- 헤더 -->
    <div class="header_left">
      <img src="@/assets/logo/header_logo.png" class="header_logo" />
    </div>
    <div class="header_center">
      <el-input type="text" class="search_bar in_block" />
      <el-button type="primary" class="in_block">Search</el-button>
    </div>
    <div class="header_right">
      <div class="header_login">
        <div class="right_menu loginB">
          <!-- 비로그인 상태 -->
          <span @click="movePage('/auth')">로그인</span>
          <span @click="movePage('/auth/select')">회원가입</span>
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
    isLogin() {
      return false;
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
