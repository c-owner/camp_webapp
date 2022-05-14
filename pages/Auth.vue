<template>
  <div class="w100p h100p" id="default-wrap">
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "Auth",
  layout: "HeaderFooter",
  data() {
    return {
      authCheck: false,
    }
  },
  created() {
    this.authCheckFunc();
    this.$al.alert({
      title: '알림',
      message: '로그인 페이지로 이동합니다.',
      callback: () => {
        this.$router.push('/auth/login');
      }
    })
  },
  mounted() {
  },
  methods: {
    authCheckFunc() {
      if (!this.authCheck) {
        this.$al.alert({
          title: '알림',
          message: '로그인 페이지로 이동합니다.',
          callback: () => {
            this.$router.push('/auth/login');
          }
        })
      }
    },
  },
}
</script>

<style scoped>

</style>
