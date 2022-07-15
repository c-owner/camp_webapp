import React from 'react';
import { TextField } from "@mui/material";

let nick = '';
let email = '';
let pw = '';
let cert = '';
const Normal = () => {
  return (
    <div className='normal'>
      <div className='normal-container'>
        <div className='register-text'>계정 정보를 입력하세요</div>
        <TextField id="user_nick" label="아이디" variant="standard" defaultValue={nick}/>
        <TextField id="user_email" label="이메일" variant="standard" defaultValue={email}/>
        <TextField id="user_pw" label="비밀번호" variant="standard" defaultValue={pw}/>
        <TextField id="user_cert" label="인증번호" variant="standard" defaultValue={cert}/>
      </div>
    </div>
  )
}

export default Normal;