import Swal from 'sweetalert2'
//import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css'

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})


const Alert = Swal.mixin({
	heightAuto : false,
	confirmButtonText:'확인',
	denyButtonText:'취소',
	cancelButtonText:'취소',

	showCloseButton: true,

	customClass: {
		container: '',
		popup: '',
		header: '',
		title: 'ft14',
		closeButton: '',
		icon: '',
		image: '',
		content: '',
		htmlContainer: '',
		input: '',
		inputLabel: '',
		validationMessage: '',
		actions: '',
		confirmButton: '',
		denyButton: '',
		cancelButton: '',
		loader: '',
		footer: '',
		timerProgressBar: '',
	}
})




export default (context, inject) => {
	inject('swal', Alert)
}
