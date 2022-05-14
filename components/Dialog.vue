<template>
	<div>
		<div class="dialog_body flex items-center justify-center  " :class="p.ani" v-for="(p , i) in list" :key="i" :style="{zIndex:(99999+(i+1))}">
			<transition name="slide-down">
				<div class="dialog_frame r10   box-shadow-z5 pos_r   overflow-h" v-if="is_show" :class="p.ani" >
					<div class="pos_a  text-black" v-if="!p.close_button_hide" style="top:10px;right:10px">
						<button  @click="cancelFn(i,p)" type="button" class="nostyle">
							<i class="ph-x inline ft24"></i>
						</button>
					</div>
					<div v-if="p.type=='alert'" class="text-black">
						<!-- Alert -->

						<div class="bg-white">
							<div class="dialog_title p-3 b-b text-black bg-white" style="height:50px" v-html="p.title" v-if="p.title"></div>
							<div class="text-center m-t20 bg-white" v-if="p.icon">
								<i :class="p.icon" class="ft60"></i>
							</div>
							<div class="dialog_content bg-white flex items-center justify-center p-3 text-center" v-html="p.message"></div>
						</div>
						<div class="dialog_button_group  text-right">
							<button class="btn btn-dark btn-block " style="border:0px;border-radius: 0px 0px;padding:13px" @click="okFn(i,p)" type="button">{{ p.ok_txt }}</button>
						</div>
						<!-- Alert -->
					</div>

					<div v-if="p.type=='confirm'" class="text-black">
						<!-- Alert -->
						<div class="bg-white">
							<div class="dialog_title p-3 bg-white b-b" style="height:50px" v-html="p.title"></div>
							<div class="text-center m-t20 bg-white" v-if="p.icon">
								<i :class="p.icon" class="ft60"></i>
							</div>
							<div class="dialog_content bg-white flex items-center justify-center p-3  text-center" v-html="p.message"></div>
						</div>
						<div class="dialog_button_group  text-right flex">

							<div class="flex1 ">
								<button class="btn btn-secondary btn-block" @click="cancelFn(i,p)" style="border:0px;border-radius: 0px;padding:13px" type="button">{{ p.cancel_txt }}</button>
							</div>
							<div class="flex1 ">
								<button class="btn btn-dark btn-block" @click="okFn(i,p)" style="border:0px;border-radius: 0px;padding:13px" type="button">{{ p.ok_txt }}</button>
							</div>
						</div>
						<!-- Alert -->
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<style>
	.dialog_body{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 99999;
	}
	.dialog_title{
		/*border-bottom:1px solid rgba(205, 205, 205, 0.34);*/
		color:#000;

	}
	.dialog_button_group{
		/*border-top:1px solid rgba(205, 205, 205, 0.34);*/
	}
	.dialog_frame{
		max-width:300px;
		width:100%;



	}
	.dialog_content{
		min-height:90px;
		color:#000;

	}
</style>

<script>


	export default {
		name: 'Dialog',
		data(){
			return {
				is_show:false,
			}
		},
		watch:{
			'$store.state.dialog.list'(){
				this.is_show=false;
				setTimeout(()=>{
					this.is_show=true;
				},200);
			}
		},

		computed:{
			list(){
				return this.$store.state.dialog.list;
			},
		},
		methods:{
			okFn(idx,data){
				if(data.callback){
					data.callback();
				}
				this.$store.commit('dialog/close',idx);
			},
			cancelFn(idx,data){
				if(data.cancel){
					data.cancel();
				}
				this.$store.commit('dialog/close',idx);
			}
		},
		created() {
			setTimeout(()=>{
				this.is_show=true;
			},200);
		}

	}
</script>
