<template>
  <div>
    <h2><span>NEW</span> & UPDATE</h2>
    <swiper class="contest_swiper" ref="swiper" :options="swiperOption"
            :slidesPerView="'auto'" @click="onClick"
            @slideChange="slideChange">
      <swiper-slide class="contest_swiper_slide"
                    v-for="(slide, s_idx) in swiperImg"
      >
<!--        :style="{'background-color': item.value}">-->
        <div class="slide_image">
          @/assets/image/temp/{{ slide }}
          <img :src="`@/assets/image/temp/`+slide" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import util from "@/mixins/util";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import 'swiper/css/swiper.css';

export default {
  name: "CampListHomeLayout",
  mixins: [],
  components: {
    Swiper, SwiperSlide
  },
  inject: [],
  provide() {
    return {}
  },
  props: {},
  data() {
    return {
      swiperImg: [
        'swiper1.jpg', 'swiper2.jpg', 'swiper3.jpg',
        'swiper4.jpg', 'swiper5.jpg', 'swiper6.jpg',
      ],

      swiperOption: {
        slidesPerView: 5,
        // slidesPerView: "auto",
        spaceBetween: 100,
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
