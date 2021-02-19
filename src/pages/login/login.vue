<template>
  <div class="login_wrapper">
    <div class="videocontainer"></div>
    <div class="login">
      <p class="login_title title">交旅业财一体化平台</p>
      <el-form :model="formLogin" ref="ruleform" :rules="rules">
        <el-form-item prop="userid">
          <el-input v-model="formLogin.userid" placeholder="请输入用户名">
            <!-- <i slot="prefix" class="el-input__icon">
              <img src="../../../static/images/user.png" />
            </i>-->
          </el-input>
        </el-form-item>
        <el-form-item prop="Password">
          <el-input v-model="formLogin.Password" type="password" placeholder="请输入密码">
            <!-- <i slot="prefix" class="el-input__icon">
              <img src="../../../static/images/psw.png" />
            </i>-->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">保存密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dologin()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      formLogin: {
        //表单对象
        browerfp: "",
        userid: "",
        Password: ""
      },
      checked: false,
      rules: {
        userid: [{ required: true, message: "请输入账号", trigger: "blur" }],
        Password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    // 登录
    dologin() {
      this.$router.push("/catalog");
    }
  }
};
</script>



<style lang="scss">
.login_wrapper {
  background: url("/static/images/bac.png") no-repeat;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form-item {
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  .title {
    text-align: center;
    color: #fff;
    width: 100%;
    font-size: 30px;
    font-weight: 400;
  }

  .login {
    width: 22.5vw;
    height: 59vh;
    margin-bottom: 5vh;
    background: bottom;
    opacity: 0.9;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    .login_title {
      font-size: 4vh;
      margin-top: 4vh;
      padding-bottom: 2vh;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #4b8afa;
    }
    .el-button {
      width: 9vw;
      margin-left: 4.5vw;
      border-radius: 30px;
      background-color: #4b8afa;
      border-color: #4b8afa;
    }
    .el-input {
      width: 100%;
    }
    .el-input__inner {
      font-size: 15px;
      text-indent: 15px;
      background: bottom;
    }
    .el-input__icon img {
      width: 17px;
      margin-top: 10px;
    }
    .el-form-item:nth-child(1) {
      margin-bottom: 6vh;
    }
    .el-form-item:nth-child(3) {
      margin-bottom: 4.2vh;
      margin-left: 10px;
    }
    .el-form-item {
      margin-bottom: 5vh;
    }
    .el-form {
      margin: 0 auto;
      width: 93%;
      background: rgba($color: #000000, $alpha: 0.3);
      .error {
        display: block;
        text-align: center;
        color: red;
      }
    }
  }
}
</style>

