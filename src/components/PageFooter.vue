<template>
    <div class="footer_wrap">
        <div class="footer_top_back">
            <div class="footer_top">
                <div class="footer_menu_group">
                    <button class="footer_menu" @click="openModal('terms-modal', 'service')">이용약관</button>
                    <button class="footer_menu" @click="openModal('terms-modal', 'privacy')">개인정보처리방침</button>
<!--                    <button class="footer_menu">이메일무단수집거부</button>-->
                </div>
<!--                <div class="footer_sns">-->
<!--                  <img  class="fs_icon" src="@/assets/image/main/footer_youtube2.png" alt="">-->
<!--                    <img  class="fs_icon2" src="@/assets/image/main/footer_insta2.png" alt="">-->
<!--                    <img  class="fs_icon2" src="@/assets/image/main/footer_facebook2.png" alt="">-->
<!--                </div>-->
            </div>
        </div>
        <div class="footer_bottom_back">
            <div class="footer_bottom">
                <div class="fb_title_wrap">
                    <div class="footer_title"> </div>
                    <div class="footer_title ft_en"> </div>
                </div>
                <div class="fb_copyright">Copyright를 준비해주세요</div>
            </div>
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
        return {
        }
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
        this.$modal.show(name,{termsType: type});
      }
    },
    watch: {},
}
</script>

<style scoped>

</style>
