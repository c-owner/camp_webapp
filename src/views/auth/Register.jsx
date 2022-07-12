import {Button, TextField} from "@mui/material";

const Register = () => {
  return (
    <div>
      <div className='register-input r-email'>
        <TextField variant="standard"></TextField>
      </div>
      <div className='register-input r-pw'>
        <TextField variant="standard"></TextField>
      </div>
      <div className='register-input r-name'>
        <TextField variant="standard"></TextField>
      </div>
      <div className='register-input r-gender'>
        <TextField variant="standard"></TextField>
      </div>
      <Button variant="contained" color="primary" onClick=''>회원가입</Button>
    </div>
  )
}

export default Register;