<template>
    <div class="form_main_wrap" id="main_fullbg">
        <div class="mainwrap"></div>
        <div class="page_title">
            <h2>회원가입</h2>
        </div>
        <div class="form_white">
            <form>
                <div class="form-group p-relative">
                    <label for="nickname">사용 닉네임</label>
                    <el-input type="text" class="auth-input" id="nickname"
                              v-model="nickname" placeholder="닉네임을 작성해주세요"
                              @input="setData('nickname',nickname)"/>
                    <div class="validation" v-if="validation.hasError('nickname')">
                        {{ validation.firstError('nickname') }}
                    </div>
                </div>
                <div class="form-group p-relative">
                    <label for="email">사용하실 이메일 (로그인 이메일) </label>
                    <el-input type="email" class="auth-input"
                              @input="setData('email',email)"
                              id="email" v-model="email" placeholder="email@email.com"/>
                    <div class="validation" v-if="validation.hasError('email')">
                        {{ validation.firstError('email') }}
                    </div>
                </div>
                <div class="form-group">
                    <div class="p-relative">
                        <label for="password">비밀번호</label>
                        <el-input type="password" class="auth-input" id="password" loading
                                  @input="setData('password',pwd)"
                                  v-model="pwd"
                                  placeholder="비밀번호 입력"/>
                        <div class="validation" v-if="validation.hasError('pwd')">
                            {{ validation.firstError('pwd') }}
                        </div>
                    </div>
                    <div class="p-relative">
                        <label for="password_confirm">비밀번호 확인</label>
                        <el-input type="password" class="auth-input" id="password_confirm"
                                  v-model="pwdChk"
                                  placeholder="비밀번호 확인"
                                  @input="setData('password_confirm', pwdChk)"/>
                        <div class="validation" v-if="validation.hasError('pwdChk')">
                            {{ validation.firstError('pwdChk') }}
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="p-relative">
                            <label for="address">지역</label>
                            <el-input type="text" class="auth-input" id="address" @keyup.enter.native="checkValidator"
                                      v-model="address" placeholder="지역을 입력해주세요"/>
                            <div class="validation" v-if="validation.hasError('address')">
                                {{ validation.firstError('address') }}
                            </div>
                        </div>
                    </div>
                </div>
                <el-button type="submit" @click="checkValidator" @keyup.enter="checkValidator"
                           class="btn btn-primary">회원가입
                </el-button>
                <el-button class="btn btn-primary" @click="$router.replace('/')">취소</el-button>
            </form>
        </div>
    </div>
</template>

<script>
import memberValidator from "@/mixins/validators/memberValidator";

export default {
    name: "RegisterPage",
    mixins: [memberValidator],
    data() {
        return {
            nickname: "",
            email: "",
            password: "",
            password_confirm: "",
            address: "",
            tags: [],
        }
    },
    methods: {
        setData(key, value) {
            this[key] = value;
        },
        checkValidator() {
            this.$validate(['nickname', 'email', 'pwd', 'pwdChk', 'address']).then((res) => {
                if (res) {
                    this.register();
                } else {
                    this.createAlert({
                        title: '알림',
                        message: '저런... 어떤 것들이 잘못되었어요.',
                        type: 'warning',
                    });
                }
            });
        },
        register() {
            let params = {
                'nickname': this.nickname,
                'email': this.email,
                'password': this.password,
                'address': this.address,
            }
            if (this.tags.length > 0) {
                params['tags'] = this.tags;
            }

            try {
                this.$api.$auth.createMember(params).then(res => {
                    console.log(res);
                    if (res.info.type === true) {
                        this.createAlert({
                            title: '축하드립니다!',
                            message: '모닥불 회원이 되신걸 환영합니다.',
                            ok_btn: '확인',
                            callback: () => {
                                this.afterFunc();
                            },
                        });
                    } else {
                        this.failedAlert();
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        failedAlert() {
            this.createAlert({
                'title': '알림',
                'message': '저런.. 회원가입 실패입니다. 다시 시도해주세요.',
                callback: () => {
                    this.$router.replace('/auth/register');
                },
            });
        },
        afterFunc() {
            this.createConfirm({
                'title': '잠깐!🤚',
                'message': "관심 태그가 없으시군요!<br/>지금 추가 하시겠습니까?",
                'ok_btn': '네',
                'cancel_btn': '아니오',
                callback: () => {
                    this.$router.replace('/register/tags');
                },
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.form_white {
    width: 800px;
    position: absolute;
    left: 50%;
    margin-left: -400px;
    top: 45%;
    z-index: 11;
    margin-top: -240px;
    text-align: center;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: #191919 0px 0px 10px;
    padding: 30px
}

form label {
    font-size: 16px;
    color: #222222;
    font-weight: 500;
    margin-bottom: 5px;
    display: block;
    cursor: pointer;
}

.el-input {
    margin-bottom: 30px;
}
</style>
