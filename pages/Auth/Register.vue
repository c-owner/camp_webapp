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
                            <el-input type="text" class="auth-input" id="address"
                                      v-model="address" placeholder="지역을 입력해주세요"/>
                            <div class="validation" v-if="validation.hasError('address')">
                                {{ validation.firstError('address') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="p-relative">
                        <label for="tag">관심태그(선택)</label>
                        <div class="cursor in_block tag_box" @click="deleteTags(tag)"
                            v-if="tags.length > 0" v-for="(tag, t_idx) in tags" :key="tag.t_no">
                            {{ tag }}
                            <i class="el-icon-close"></i>
                        </div>
                        <br/>
                        <el-input type="text" class="tag-input" id="tag" @input="setData('tag', tag)"
                                  @keyup.enter.native="addTags(tag)"
                                  v-model="tag" placeholder="#태그"/>
                        <div class="validation" v-if="validation.hasError('tag')">
                            {{ validation.firstError('tag') }}
                        </div>
                    </div>
                </div>
                <el-button type="submit" @click="checkValidator"
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
    transition: 'fade',
    mixins: [memberValidator],
    data() {
        return {
            nickname: "",
            email: "",
            password: "",
            password_confirm: "",
            address: "",
            tag: "",
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
                    this.$alert.createAlert({
                        title: '알림',
                        content: '저런... 어떤 것들이 잘못되었어요.',
                        type: 'warning',
                    });
                }
            });
        },
        async register() {
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
               await this.$api.$auth.createMember(params).then(res => {
                    if (res.info.type === true) {
                        this.$alert.createAlert({
                            title: '축하드립니다!',
                            content: '모닥불 회원이 되신걸 환영합니다.',
                            btnText: '확인',
                            hide: () => {
                                this.$router.replace('/auth/login');
                            },
                        });
                    } else {
                        this.failedAlert();
                    }
                });
            } catch (e) {
                this.failedAlert();
                console.log(e);
            }
        },
        failedAlert() {
            this.$alert.createAlert({
                title: '알림',
                content: '저런.. 회원가입 실패입니다. 다시 시도해주세요.',
                hide: () => {
                    this.$router.replace('/auth/register');
                },
            });
        },
        addTags(tag) {
            if (this.tags.length >= 5) return;

            this.$validate(['tag']).then((res) => {
                if (res) this.tags.push(tag);
            });
            this.tag = '';
        },
        deleteTags(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
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
