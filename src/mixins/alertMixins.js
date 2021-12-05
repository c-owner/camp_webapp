import Swal from 'sweetalert2'

// Vue.use(AlertPlugin);
// Vue.use(ConfirmPlugin);

/*
alert 관련 메시지 이벤트 저장 후 사용
 */

export default {
    methods: {
        createAlert(params) {
            Swal.fire({
                title: !params.title ? '' : params.title,
                html: !params.content ? '' : params.content,
                confirmButtonText: !params.btnText ? this.$t('yes') : params.btnText,
                customClass: params.classname ? params.classname : 'x_alert',
                //check면 chk_alert 클래스를 주세요.
                onClose: () => {
                    if (params.back) {
                        window.history.back();
                    } else if (params.hide) {
                        params.hide();
                    }
                }
            })
        },
        createConfirm(params) {
            Swal.fire({
                title: !params.title ? '' : params.title,
                html: !params.content ? '' : params.content,
                confirmButtonText: !params.confirmText ? this.$t('yes') : params.confirmText,
                cancelButtonText: !params.cancelText ? this.$t('cancel') : params.cancelText,
                showCancelButton: true,
                customClass: params.classname ? params.classname : 'x_alert',
                showCloseButton: false,
                reverseButtons: true,
                //check면 chk_alert 클래스를 주세요.
                //결제진행 팝업일때는 pay_alert 클래스를 주세요.
            }).then((result) => {
                if (result.value) {
                    if (params.confirm)
                        params.confirm();
                } else if (result.dismiss === 'cancel') {
                    if (params.cancel)
                        params.cancel();
                } else if (result.dismiss === 'dismiss') {
                    if (params.hide)
                        params.hide();
                }
            })
        },
        errorAlert(params) {
            Swal.fire({
                title: '',
                html: params,
                confirmButtonText: this.$t('yes'),
                customClass: 'x_alert',
                onClose: () => {

                }
            })
        },
        jstErrorAlert(params) {
            Swal.fire({
                title: '',
                html: params,
                confirmButtonText: this.$t('confirm'),
                customClass: 'justreet',
                onClose: () => {

                }
            })
        },
        errorAlert2(params) {
            Swal.fire({
                title: '',
                html: params,
                confirmButtonText: this.$t('confirm'),
                onClose: () => {

                }
            })
        },
        doubleButtonAlert(params) {
            Swal.fire({
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: !params.confirmText ? this.$t('yes') : params.confirmText,
                cancelButtonText: !params.cancelText ? this.$t('cancel') : params.cancelText,
                customClass: 'double_b_alert',
            }).then((result) => {
                if (result.value) {
                    if (params.confirm)
                        params.confirm();
                } else if (result.dismiss === 'cancel') {
                    if (params.cancel)
                        params.cancel();
                }
            });
        }

    }
}
