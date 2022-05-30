<template>
    <div class="form_main_wrap" id="main_fullbg">
        <div class="mainwrap"></div>
        <div class="form_white">
            <v-form @submit.prevent="register">
                <div class="form-group p-relative">
                    <label for="name">사용 닉네임</label>
                    <el-input type="text" class="auth-input" id="name"
                              v-model="name" placeholder="닉네임을 작성해주세요"
                              @input="setData('name',name)"/>
                    <div class="validation" v-if="validation.hasError('name')">
                        {{ validation.firstError('name') }}
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
                                  @input="setData('pwd',pwd)"
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
                                  @input="setData('pwdChk', pwdChk)"/>
                        <div class="validation" v-if="validation.hasError('pwdChk')">
                            {{ validation.firstError('pwdChk') }}
                        </div>
                    </div>
                </div>
                <el-button type="submit" class="btn btn-primary">회원가입</el-button>
                <el-button class="btn btn-primary" @click="$router.replace('/')">취소</el-button>
            </v-form>
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
            name: "",
            email: "",
            pwd: "",
            pwdChk: ""
        }
    },
    methods: {
        setData(key, value) {
            this[key] = value;
        },
        register() {

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
