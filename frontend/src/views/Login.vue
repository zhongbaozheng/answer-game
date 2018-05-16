<template>
    <md-card>
      <md-card-header>
        <div class="md-title">登录</div>
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
          <md-button :disabled="!nickname || !password" @click="login()" class="md-raised md-primary md-layout-item md-size-75">登录</md-button>
          <md-button to="/register" class="md-flat md-primary md-layout-item md-size-75">尚未注册？</md-button>
        </div>
      </md-card-content>
      <md-snackbar md-position="left" :md-duration="2000" :md-active.sync="showSnack" md-persistent>
        <span>{{msg}}</span>
      </md-snackbar>
    </md-card>
</template>

<script>

export default {
  name: 'login',
  data: () => ({
    nickname: '',
    password: '',
    msg: '',
    showSnack: false
  }),
  methods: {
    login() {
      this.$http.post('/user/login', {
        nickname: this.nickname,
        password: this.password
      }).then(data => {
        this.$store.commit('setUser', data);
        this.$router.replace('/');
      }).catch(res => {
        this.msg = res.msg;
        this.showSnack = true;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .md-button {
    margin: 6px 8px;
  }

  .md-button.md-theme-default {
    border-radius: 5px;
  }

  .md-title {
    color: rgba(255,255,255,0.9)
  }

  .md-card.md-layout-item {
    background-image: url('../assets/bg.png');
    background-repeat: no-repeat;
    background-color: #216EC6;
    background-size: 100%;
    background-position: bottom;
    padding-bottom: 120px;
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

</style>