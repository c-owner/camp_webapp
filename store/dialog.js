export const state = () => ({
    list:[
		/*{
			title:'알림',
			messange:'로그인 페이지로 이동하시겠습니까?',
			type:'alert',
			callback:null,
			cancelCallback:null,
		},*/
	],
})

export const mutations = {
    alert: (state, data) => {

	  	data.type = 'alert';
		if(!data.title) data.title = '';
		if(!data.ok_txt) data.ok_txt = '확인';
		if(!data.ani) data.ani = 'animate__fadeIn';
		if(!data.icon) data.icon = '';
		if(data.message){
			state.list.push(data);
		}else{
			console.error('alert 내용이 없습니다.');
		}

    },
	confirm: (state, data) => {

	    data.type = 'confirm';
		if(!data.title) data.title = '';
		if(!data.ok_txt) data.ok_txt = '확인';
		if(!data.cancel_txt) data.cancel_txt = '취소';
		if(!data.ani) data.ani = 'animate__fadeIn';
		if(!data.icon) data.icon = '';
		if(data.message){
			state.list.push(data);
		}else{
			console.error('confirm 내용이 없습니다.');
		}

    },
    close: (state,idx) => {
        state.list.splice(idx,1);
    },

}

export const getters = {
    info : (state)=> {
        return state.popup;
    },
};
