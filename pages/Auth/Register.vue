<template>
    <div class="form_main_wrap" id="main_fullbg">
        <div class="mainwrap"></div>
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
                            <el-input type="text" class="auth-input" id="address"
                                      v-model="address" placeholder="지역을 입력해주세요"/>
                            <div class="validation" v-if="validation.hasError('address')">
                                {{ validation.firstError('address') }}
                            </div>
                        </div>
                    </div>
                </div>
                <el-button type="submit" @click="checkValidator" class="btn btn-primary">회원가입</el-button>
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
                    this.$alert("입력하신 내용을 확인해주세요.", "가입 실패", {
                        confirmButtonText: "확인",
                    });
                }
            });
        },
        register() {
            let params = {
                'nickname' : this.nickname,
                'email' : this.email,
                'password' : this.password,
                'address': this.address,
            }
            if (this.tags.length > 0) {
                params['tags'] = this.tags;
            }

            try {
                this.$api.$auth.createMember(params).then(res => res.data.result).then(res => {
                    if (res.info.type) {
                        console.log(res);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
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
