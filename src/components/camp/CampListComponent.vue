<template>
  <div>
    <camp-list-link :listLayout="listLayout"></camp-list-link>
  </div>
</template>

<script>
import CampListLink from "@/components/camp/link/CampListLink";
import campUtil from "@/components/camp/campUtil";

export default {
  name: "CampListComponent",
  mixins: [campUtil],
  components: {CampListLink},
  inject: [],
  provide() {
    return {}
  },
  props: {
    campType: '',
  },
  data() {
    return {
      listLayout: '',
    }
  },
  beforeRouterEnter() {
  },
  created() {
    this.initConfig();
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  methods: {
    initConfig() {
      let campConfig = this.returnCampConfig(this.campType);

      this.listLayout = campConfig.listLayout;
    },
  },
  watch: {},
}
</script>

<style scoped>
</style>
