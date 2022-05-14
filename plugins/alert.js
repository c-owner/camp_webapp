/*****************************************************************
*
*  Filename : plugins/alert.js
*
*****************************************************************/

export default (context, inject, app) => {

	const now_alert = {
		alert(options){

			if(!options.title)	options.title = '';
			if(!options.message) options.message = '';
			if(!options.ok_txt) options.ok_txt = '확인';


			context.store.commit('dialog/alert', {
				title:options.title,
				icon:options.icon,
				message:options.message,
				ok_txt:options.ok_txt,
				close_button_hide:options.close_button_hide,
				callback: ()=>{
					try{
						options.callback();
					}catch(e){

					}
				},

			});
		},
		confirm(options){

			if(!options.title)	options.title = '';
			if(!options.message) options.message = '';
			if(!options.ok_txt) options.ok_txt = '확인';
			if(!options.cancel_txt) options.cancel_txt = '취소';

			context.store.commit('dialog/confirm', {
				title:options.title,
				icon:options.icon,
				message:options.message,
				ok_txt:options.ok_txt,
				cancel_txt:options.cancel_txt,
				close_button_hide:options.close_button_hide,
				callback: ()=>{
					try{
						options.callback();
					}catch(e){

					}
				},
				cancel: ()=>{
					try{
						options.cancel();
					}catch(e){

					}
				},
			});
		}
	}

	inject('al', now_alert)
}
