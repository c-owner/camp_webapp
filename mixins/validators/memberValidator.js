import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);

export default {
    data() {
        return {
            // register에서 사용할 data 선언
            nick: '',
            nickCheckDuplicate: false,
            nickDuplicate: false,
            oldPwd:'',
            pwd: '',
            pwdChk: '',
            email: '',
            emailChk: '',
            emailCheckDuplicate: false,
            emailDuplicate: false,
            referrerId: '',
            referrerIdChk: false,

            id: '',
            password: '',

            sns1: '',
            sns2: '',
            sns3: '',
            introduce: '',
            profileFile: [],
            thumbnailFile: [],
            backgroundFile: [],
            portfolio: '',
        }
    },
    computed: {},
    validators: {
        name: function (value) {
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
                      return this.$t('nickErrorMsg1');
                  }
              })
        },
        email: function (value) {
            return Validator.value(value)
                .required(this.$t('require_email'))
                .email(this.$t('require_email'))
        },
        emailChk: function (value) { // 인증번호
            return Validator.value(value)
                .required(this.$t('confirm_num'))
        },
        emailCheckDuplicate: function (value) {
            return Validator.value(value)
                .custom(() => {
                    if(this.emailDuplicate) {
                        return this.$t('emailErrorMsg');
                    }
                })
        },
        pwd: function (value) {
            let msg = this.$t('pwdErrorMsg2');
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
                    return this.$t('pwdErrorMsg');

                  }
              })
        },
        oldPwd: function (value) {
          return Validator.value(value)
        },
        referrerId: function (value) {
            return Validator.value(value)
                .required(this.$t('require_email'))
                .email(this.$t('require_email'))
        },
        referrerIdChk: function (value) {
            return Validator.value(value)
                .custom(() => {
                    if (this.referrerId === '') {
                        this.referrerIdChk = true;
                        return '';
                    } else {
                        if (!this.referrerIdChk) {
                            return this.$t('referrerErrorMsg');
                        } else {
                            return '';
                        }
                    }
                })
        },
        // 로그인
        id: function (value) {
            let msg = this.$t('write_id_msg');
            return Validator.value(value)
                    .required(msg)
        },
        password: function (value) {
            let msg = this.$t('write_pwd');
            return Validator.value(value)
                    .required(msg)
        },

        sns1: function (value) {
            return Validator.value(value)
                .url(this.$t('sns_url_format_err1'))
        },
        sns2: function (value) {
            return Validator.value(value)
                .url(this.$t('sns_url_format_err1'))
        },
        sns3: function (value) {
            return Validator.value(value)
                .url(this.$t('sns_url_format_err1'))
        },
        profileFile: function (value) {
            return Validator.value(value)
        },
        thumbnailFile: function (value) {
            return Validator.value(value)
        },
        backgroundFile: function (value) {
            return Validator.value(value)
        },
        introduce: function (value) {
            return Validator.value(value)
        },
        portfolio: function (value) {
            return Validator.value(value)
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
        referrerIdCheck() {
            this.$validate(['referrerId']).then(success => {
                if (!success) {
                    return false;
                }
                let params = {
                    mid: this.referrerId,
                };
                try {
                    this.$api.$member.getList(params).then(res => res.Data.Result).then(res => {
                        let type = res.Info.type;
                        if (res.List.length === 0 )  {
                            type = null;
                        }
                         this.checkRefferAfter(type);
                    })
                } catch (e) {
                    console.log(e);
                }
            })
        },
        checkRefferAfter(type) {
            if (type === 1) {
                this.referrerIdChk = true;
            } else {
                this.referrerIdChk = false;
            }
            this.$validate(['referrerIdChk'])
        },


    },
}
