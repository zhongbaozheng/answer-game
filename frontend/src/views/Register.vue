<template>
  <md-card class="register">
    <md-card-header>
      <div class="md-title">注册</div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-size-75 md-alignment-center">
        <md-field class="md-layout-item md-size-75">
          <label>昵称</label>
          <md-input v-model="nickname"></md-input>
        </md-field>
        <md-field class="md-layout-item md-size-75">
          <label>密码</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-button :disabled="!nickname || !password" @click="register()" class="md-raised md-primary md-layout-item md-size-75">注册</md-button>
        <md-button to="/login" class="md-flat md-primary md-layout-item md-size-75">已有账号？</md-button>
      </div>
    </md-card-content>
    <md-snackbar md-position="left" :md-duration="2000" :md-active.sync="showSnack" md-persistent>
      <span>{{ msg }}</span>
    </md-snackbar>
  </md-card>
</template>

<script>

export default {
  name: 'register',
  data: () => ({
    nickname: '',
    password: '',
    showSnack: false,
    msg: ''
  }),
  methods: {
    register() {
      this.$http.post('/user/save', {
        nickname: this.nickname,
        password: this.password
      }).then(data => {
        this.msg = '注册成功，即将跳转至登录页面…';
        this.showSnack = true;
        window.setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      }).catch(res=> {
        this.msg = res.msg;
        this.showSnack = true;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .register {
    height: 100%;
    background: transparent;
    box-shadow: 0 0 0 transparent;
  }

  .md-button {
    margin: 6px 8px;
  }
  .md-button.md-theme-default {
    border-radius: 5px;
  }

  .md-title {
    color: rgba(255,255,255,0.9)
  }

  .md-field.md-theme-default label {
    font-size: 16px;
  }

  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    background-color: #FFBB4F;
  }

  .md-button.md-theme-default.md-primary {
    color: rgba(255,255,255,0.9);
  }

  .md-field.md-focused .md-input, .md-field.md-focused .md-textarea, .md-field.md-has-value .md-input, .md-field.md-has-value .md-textarea {
    -webkit-text-fill-color: white;
  }

  input:-webkit-autofill {
    background-color: white !important;
    background-image: none;
    color: white;
  }

  .md-field.md-theme-default.md-focused label {
    color: white;
  }
</style>