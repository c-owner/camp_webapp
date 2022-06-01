import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
import {maxLength, minLength} from "simple-vue-validator/src/templates";
import {resolve} from "chart.js/helpers";
const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);

export default {
    data() {
        return {
            // register에서 사용할 data 선언
            nickname: '',
            nickCheckDuplicate: false,
            nickDuplicate: false,
            oldPwd:'',
            pwd: '',
            pwdChk: '',
            email: '',
            emailChk: '',
            emailCheckDuplicate: false,
            emailDuplicate: false,
            address: '',
            tag: '',

            // login
            id: '',
            password: '',

            sns1: '',
        }
    },
    computed: {},
    validators: {
        nickname: function (value) {
            let msg = "닉네임은 2~10자 이내로 입력해주세요.";
            return Validator.value(value)
                .required(msg)
                .minLength(2, msg)
                .maxLength(20, msg)
        },
        nickCheckDuplicate: function (value) {
          return Validator.value(value)
              .custom(() => {
                  if (this.nickDuplicate) {
                      return '중복된 닉네임입니다.';
                  }
              })
        },
        email: function (value) {
            return Validator.value(value)
                .required('이메일을 입력해주세요.')
                .email('이메일 형식에 맞게 입력해주세요.')
        },
        emailChk: function (value) { // 인증번호
            return Validator.value(value)
                .required('인증번호를 입력해주세요.')
        },
        emailCheckDuplicate: function (value) {
            return Validator.value(value)
                .custom(() => {
                    if(this.emailDuplicate) {
                        return '중복된 이메일입니다.';
                    }
                })
        },
        pwd: function (value) {
            let msg = "비밀번호는 8~20자 이내로 대소문자, 숫자, 특수문자를 포함해서 입력해주세요.";
            return Validator.value(value)
                .required(msg)
                .minLength(8, msg)
                .maxLength(20, msg)
                .regex('^.*(?=^.{8,20}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=.]).*$', msg)
        },
        pwdChk: function (value) {
          return Validator.value(value)
              .custom(() => {
                  if (value != this.pwd) {
                    return '비밀번호가 일치하지 않습니다.';

                  }
              })
        },
        oldPwd: function (value) {
          return Validator.value(value)
        },
        address: function (value) {
            return Validator.value(value)
                .custom(() => {
                    if (value.length < 1) {
                        return '주소를 입력해주세요.';
                    }
                })
        },
        tag: function (value) {
            return Validator.value(value)
                .required('태그를 입력해주세요.')
                .minLength(2, '태그는 2자 이상 입력해주세요.')
                .maxLength(8, '태그는 8자 이하로 입력해주세요.')
                .custom(() => {
                    if (this.tags.length >= 5) {
                        return '태그는 5개까지 입력할 수 있습니다.';
                    }
                })
        },
        // 로그인
        id: function (value) {
            let msg = "아이디를 입력해주세요.";
            return Validator.value(value)
                    .required(msg)
        },
        password: function (value) {
            let msg = "비밀번호를 입력해주세요.";
            return Validator.value(value)
                    .required(msg)
        },

        sns1: function (value) {
            return Validator.value(value)
                .url('유효한 인증코드를 입력해주세요.')
        },
    },

    methods: {
        checkEmailDuplicate() {
            this.$validate(['email']).then(success => {
                if (!success) {
                    return false;
                }
                let params = {
                    mb_id: this.email,
                };
                try {
                    this.$api.$member.checkEmailDuplicate(params).then(res => res.Data.Result).then(res => {
                        let type = res.Info.type;
                        this.checkEmailAfter(type);
                    });
                } catch (e) {
                    console.log(e);
                }

            })
        },
        checkEmailAfter(type) {
            if (type === 1 ) {
                this.emailCheckDuplicate = true;
                this.emailDuplicate = false;
            } else {
                this.emailCheckDuplicate = false;
                this.emailDuplicate = true;
            }
            this.$validate(['emailCheckDuplicate'])
        },
        checkNickDuplicate() {
            if (this.nickCheckDuplicate) {
                return false;
            }
            this.$validate(['nick']).then(success => {
                if (!success) {
                    return false;
                }
                let params = {
                    mb_nick: this.nick,
                };
                try {
                    this.$api.$member.checkNickDuplicate(params).then(res => res.Data.Result).then(res => {
                        let type = res.Info.type;
                        this.checkNickAfter(type);
                    })
                } catch (e) {
                    console.log(e);
                }
            })
        },
        checkNickAfter(type) {
            if (type === 1 ) {
                this.nickCheckDuplicate = true;
                this.nickDuplicate = false;
            } else {
                this.nickCheckDuplicate = false;
                this.nickDuplicate = true;
            }
            this.$validate(['nickCheckDuplicate'])
        },
    },
}
