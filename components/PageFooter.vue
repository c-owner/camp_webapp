<template>
  <div class="footer_wrap">
    <div class="notice_line">
      <div class="f_notice_title">공지사항</div>
      <div class="f_notice_subject">[모닥불] Campfire 서비스 안내</div>
      <div class="arrow_btn">
        <button class="noti_button"><i class="ph-caret-left-fill"></i></button>
        <button class="noti_button"><i class="ph-caret-right-fill"></i></button>
      </div>
    </div>
    <div class="footer_top_back">
      <ul class="footer_menu_group">
        <li style="margin: 0">
          <NuxtLink to="/info">
            소개
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            서비스 소개
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/info">
            고객센터
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            이용약관
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            개인정보처리방침
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="footer_bottom_back">
      <br/>
      <div class="fb_copyright">Copyright © 2022 corner. All rights reserved.</div>
    </div>
  </div>
</template>
<script>

export default {
  name: "PageFooter",
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

  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  methods: {
    openModal(name, type) {
      this.$modal.show(name, {termsType: type});
    }
  },
  watch: {},
}
</script>

<style scoped>

</style>
