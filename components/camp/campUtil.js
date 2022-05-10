const campConfig = {
  campHome: {
    listLayout: 'CampListHomeLayout',

  }
}
export default {
  methods: {
    returnCampConfig(type) {
      return campConfig[type];
    },
  },
  filterConfig: {

  },
}
