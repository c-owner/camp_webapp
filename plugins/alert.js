import Swal from 'sweetalert2'
import Vue from "vue";
/****************************
 * Developer : corner
 * Description :
                alert 관련 메시지 이벤트 저장 후 사용
 ****************************/

Vue.prototype.$alert = {
        createAlert(params) {
            Swal.fire({
                title: !params.title ? '' : params.title,
                html: !params.content ? '' : params.content,
                confirmButtonText: !params.btnText ? '확인' : params.btnText,
                customClass: params.classname ? params.classname : 'campfire_alert',
                //check면 chk_alert 클래스.
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
                confirmButtonText: !params.confirmText ? '확인' : params.confirmText,
                cancelButtonText: !params.cancelText ? '취소' : params.cancelText,
                showCancelButton: true,
                customClass: params.classname ? params.classname : 'campfire_confirm',
                showCloseButton: false,
                reverseButtons: true,
                //check면 chk_alert 클래스를 주세요.
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
        doubleButtonAlert(params) {
            Swal.fire({
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: !params.confirmText ? '확인' : params.confirmText,
                cancelButtonText: !params.cancelText ? '취소' : params.cancelText,
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

export default Vue.prototype.$alert;
