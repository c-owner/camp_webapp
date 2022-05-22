<template>
  <div class="default-index">
    <div id="main_fullbg">
      <div class="main_fullbg-wrap">
        <div class="mainwrap"></div>
        <home-main-search-component></home-main-search-component>
      </div>
    </div>
    <div id="content-wrap">
      <div class="content" ref="messagesContainer">
        <div class="service_message">
          페이지 준비중입니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'HeaderFooter',

}
</script>
