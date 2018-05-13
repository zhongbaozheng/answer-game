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
</style>