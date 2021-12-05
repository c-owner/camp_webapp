export default {
	methods: {
		setImageOptions(width=null, height=null, format=null, quality=null) {
			let returnOption = '';
			let obj = {
				w: width,
				h: height,
				f: format   ,
				q: quality
			}
			let queryKeys = Object.keys(obj);
			queryKeys.forEach((key, index) => {
				if(!obj[key]) {
					return;
				}
				returnOption += `${key}=${obj[key]}&`
			})
			if(returnOption != '') {
                returnOption = returnOption.slice(0, -1);
			}
			return returnOption
		},
	}
}