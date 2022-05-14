<template>
  <div class="main-search d-block">
    <h2>{{ searchTitle }}</h2>
    <div class="area_select" @click="movePage('/')">
      지역별 &nbsp;&nbsp; <font-awesome-icon icon="fa-solid fa-arrow-down" />
    </div>
    <div class="search_form">
      <el-input type="text" @click.native="changeTitle()"
                placeholder="검색어를 입력해주세요"
                v-model="searchInput" class="search_input"/>
      <el-button class="search_btn" @click="movePage('/')">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainSearchComponent",
  mixins: [],
  components: {},
  inject: [],
  provide() {
    return {}
  },
  props: {},
  data() {
    return {
      searchTitle: '오늘은 어디로 가볼까?',
      searchInput: '',
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
    changeTitle() {
      let titleArr = [
        '오늘은 어디로 가볼까?🤔', '검색을 해볼까요?😎', '좋은 곳은 많아요🤩', '오늘도 좋은 하루 되세요💪'
      ]
      return this.searchTitle = this.randArr(titleArr);
    },
    randArr(array) {
      let rand = Math.random() * array.length | 0;
      let rValue = array[rand];
      return rValue;
    },
    movePage(url) {
      return this.searchTitle = '아직 검색기능은 존재하지 않아요😅'
    },
  },
  watch: {},
}
</script>

<style scoped>
</style>
