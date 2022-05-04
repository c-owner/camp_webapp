<template>
  <component :is="component" v-if="component" ></component>
</template>

<script>
export default {
  name: "CampListLink",
  mixins: [],
  components: {},
  inject: [],
  provide() {
    return {}
  },
  props: {
    listLayout: '',
    campData: {
      type: Array,
      default: () => []
    },
    paginationData: {default: {page: 1, size: 10, total: 0}},

  },
  data() {
    return {
      component: null,
    }
  },
  beforeRouterEnter() {
  },
  created() {
  },
  mounted() {
    this.loader()
      .then(() => {
        this.component = () => this.loader()
      })
      .catch(() => {
        this.component = () => import('@/template/camp/list/CampListHomeLayout')
      })
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    loader() {
      if (!this.listLayout) {
        return null
      }
      return () => import(`@/template/camp/list/${this.listLayout}`)
    },
  },
  methods: {},
  watch: {},
}
</script>

<style scoped>

</style>
