<template>
  <div class="default-index">
    <!--      <div class="main_bg">-->
    <!--        <b-button variant="primary">button</b-button>-->
    <!--      </div>-->
    <div id="main_fullbg">
      <div class="main_fullbg-wrap">
      <div class="mainwrap"></div>
        <!--      <top-main-banner-component></top-main-banner-component>-->
        <home-main-search-component></home-main-search-component>
<!--        <Chart />-->
      </div>
    </div>
    <div id="content-wrap">
      <div class="content" ref="messagesContainer">
        aaa
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
}
</script>
