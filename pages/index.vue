<template>
    <div class="default-index">
        <div id="main_fullbg">
            <div class="main_fullbg-wrap">
                <video
                    id="recommendations-player"
                    muted
                    autoplay
                    loop
                    style="width: 100%; height: 100%;"
                    class="mainwrap cld-video-player cld-video-player-skin-dark w-2/3 h-96 mx-auto"
                ></video>
                <div class="mainwrap"></div>
                <home-main-search-component></home-main-search-component>
            </div>
        </div>
        <!--    <video-player src="@/assets/videos/fireplace_bg.mp4"></video-player>-->
        <div id="content-wrap">
            <div class="content" ref="messagesContainer">
                <div class="service_message">
                    페이지 준비중입니다.....
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data() {
        return {
            cld: null,
            player: null,
            source1: {
                publicId: "nuxtjs-video-recommendations/fireplace_bg_hoxtgx",
                title: 'Night Street',
                subtitle: 'Street at night with traffic and pedestrians',
                description: 'Street at night with traffic and pedestrians'
            },
            source2: {
                publicId: "nuxtjs-video-recommendations/nightsky_bg_qt5bpq",
                title: 'Cookie',
                subtitle: 'Decorating a Cupcake with Gingerbread Cookie',
                description: 'Decorating a Cupcake with Gingerbread Cookie'
            },

        };
    },
    mounted() {
        this.source1.recommendations = [
            this.source2
        ];

        this.cld = cloudinary.Cloudinary.new({
            cloud_name: process.env.NUXT_ENV_CLOUDINARY_CLOUD_NAME || "dtdnarsy1",
            secure: true,
            transformation: {crop: 'limit', width: 300, height: 900}
        });

        this.player = this.cld.videoPlayer('recommendations-player',
            {
                autoShowRecommendations: true,
                sourceTypes: ['mp4']
            }
        );

        this.player.source(this.source1);
    }
}
</script>

<style scoped>
</style>
