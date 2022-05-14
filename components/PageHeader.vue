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
        <li>
          <NuxtLink to="/">HOME</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/info/notice">공지사항</NuxtLink>
        </li>
        <li><NuxtLink to="/auth">회원가입</NuxtLink></li>
        <li><NuxtLink to="/auth">로그인</NuxtLink></li>
        <li><NuxtLink to="/info/center">고객센터</NuxtLink></li>
      </ul>
      <div class="header-wrap">
        <div class="topmenu">
          <ul>
            <li id="topmenu">
              <NuxtLink to="/">전체</NuxtLink>
            </li>
            <li id="topmenu">
              <NuxtLink to="/">캠핑장</NuxtLink>
            </li>
            <li id="topmenu">
              <NuxtLink to="/">테마검색</NuxtLink>
            </li>
            <li id="topmenu"><NuxtLink to="/">모닥불장터</NuxtLink></li>
            <li id="topmenu"><NuxtLink to="/">캠핑정보</NuxtLink></li>
            <li id="topmenu"><NuxtLink to="/">커뮤니티</NuxtLink></li>
          </ul>
        </div>
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
