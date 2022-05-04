<template>
  <div>
    <h2><span>NEW</span> & UPDATE</h2>
    <swiper class="contest_swiper" ref="swiper" :options="swiperOption"
            :slidesPerView="'auto'" @click="onClick"
            @slideChange="slideChange">
      <swiper-slide class="contest_swiper_slide">

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import util from "@/mixins/util";

export default {
  name: "CampListHomeLayout",
  mixins: [],
  components: {},
  inject: [],
  provide() {
    return {}
  },
  props: {},
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        // slidesPerView: "auto",
        spaceBetween: 40,
        autoHeight: true,
        grabCursor: true,
        autoWidth: true,
        centeredSlides: true,
        slidesOffsetBefore: -15,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          // type: 'bubble',
          clickable: true
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.contest_next',
          prevEl: '.contest_prev',
        },
      },
      swiperOptionNoLoop: {
        slidesPerView: 4,
        // slidesPerView: "auto",
        spaceBetween: 40,
        autoHeight: true,
        grabCursor: true,
        autoWidth: true,
        centeredSlides: true,
        slidesOffsetBefore: -15,
        pagination: {
          el: '.swiper-pagination',
          // type: 'bubble',
          clickable: true
        },
        navigation: {
          nextEl: '.contest_next',
          prevEl: '.contest_prev',
        },
      },
      slideIndex: 0,
      showSlide: false,
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
    slideChange() {
      this.slideIndex = this.$refs.swiper.$swiper.realIndex;
    },
    movePage(url) {
      this.$router.push(url)
    },
    onClick(event) {
      if (util.isEmpty(event.target)) {
        return false;
      }
      let element = event.target;
      let elementId = element.id;
      if (util.isEmpty(elementId) || elementId.indexOf('mainCompetition')) {
        return false;
      }
      let elementIdx = elementId.replace('mainCompetition', "");
      this.movePage('/competition/' + elementIdx);
    },
  },
  watch: {},
}
</script>


<style scoped>
</style>
