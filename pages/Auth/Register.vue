<template>
  <div class="form_main_wrap" id="main_fullbg">
    <div class="mainwrap"></div>
    <div class="form_white">
      <v-form @submit.prevent="register">
        <div class="form-group">
          <label for="name">사용하실 닉네임</label>
          <el-input type="text" class="auth-input" id="name" required
                    v-model="name" placeholder="닉네임을 작성해주세요" />
        </div>
        <div class="form-group">
          <label for="email">사용하실 이메일 (로그인 이메일) </label>
          <el-input type="email" class="auth-input" id="email" required v-model="email" placeholder="email@email.com" />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <el-input type="password" class="auth-input" id="password" loading required v-model="password" placeholder="비밀번호 입력" />
          <label for="password_confirm">비밀번호 확인</label>
          <el-input type="password" class="auth-input" id="password_confirm" required v-model="password_confirm" placeholder="비밀번호 확인" />
        </div>
        <el-button type="submit" class="btn btn-primary">회원가입</el-button>
        <el-button class="btn btn-primary" @click="$router.replace('/')">취소</el-button>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    }
  },
  methods: {
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
