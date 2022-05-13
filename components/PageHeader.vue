<template>
  <div class="header-full">
    <!-- 헤더 -->
    <NuxtLink
      to="/"
      class="logo"
    >
      <img src="@/assets/logo/header_logo.png" class="header_logo"/>
    </NuxtLink>
    <div class="gnb">
      <ul>
        <li><a href="/">HOME</a></li>
        <li><a href="/">공지사항</a></li>
        <li><a href="/">회원가입</a></li>
        <li><a href="/">로그인</a></li>
        <li><a href="/">고객센터</a></li>
      </ul>
    </div>
    <div class="header-wrap">
      <div class="topmenu">
        <ul>
          <li id="topmenu"><a href="/">전체</a></li>
          <li id="topmenu"><a href="/">캠핑장</a></li>
          <li id="topmenu"><a href="/">테마검색</a></li>
          <li id="topmenu"><a href="/">모닥불장터</a></li>
          <li id="topmenu"><a href="/">캠핑정보</a></li>
          <li id="topmenu"><a href="/">커뮤니티</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
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
