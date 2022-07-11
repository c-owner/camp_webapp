import {Button, TextField} from "@mui/material";

const Register = () => {
  return (
    <div>
      <div className='register-input r-email'>
        <TextField></TextField>
      </div>
      <div className='register-input r-pw'>
        <TextField></TextField>
      </div>
      <div className='register-input r-name'>
        <TextField></TextField>
      </div>
      <div className='register-input r-gender'>
        <TextField></TextField>
      </div>
      <Button onClick=''>회원가입</Button>
    </div>
  )
}

export default Register;