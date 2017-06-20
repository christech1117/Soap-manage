<template lang="pug">
.login-wrap
  .ms-title 後台管理系統
  .ms-login
    el-form.demo-ruleForm(:model='ruleForm', :rules='rules', ref='ruleForm', label-width='0px')
      el-form-item(prop='username')
        el-input(v-model='ruleForm.username', placeholder='username')
      el-form-item(prop='password')
        el-input(type='password', placeholder='password', v-model='ruleForm.password', @keyup.enter.native="submitForm('ruleForm')")
      .login-btn
        el-button(type='primary', @click="submitForm('ruleForm')") 登入
      p(style='font-size:12px;line-height:30px;color:#999;') Tips : 用戶名和密碼隨便填。
</template>
script
<script>
export default {
  data: function(){
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '輸入帳號', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '輸入密碼', trigger: 'blur' }
        ]
      }
    }
  },
    methods: {
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    localStorage.setItem('ms_username',self.ruleForm.username);
                    self.$router.push('/dashboard');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
