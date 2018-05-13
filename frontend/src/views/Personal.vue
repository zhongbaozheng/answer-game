<template>
  <div class="personal">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">修改资料</span>
    </div>
    <md-card>
      <md-card-content>
        <md-avatar class="md-large">
          <img src="@/assets/logo.png" alt="Avatar">
        </md-avatar>
        <div class="md-layout md-size-75 md-alignment-center">
          <md-field class="md-layout-item md-size-75">
            <label>姓名</label>
            <md-input v-model="nickname"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-75">
            <label>新密码</label>
            <md-input v-model="newPassword" type="password"></md-input>
          </md-field>
          <md-button @click="update()" :disabled="!newPassword" class="md-raised md-primary md-layout-item md-size-75">确认更改</md-button>
        </div>
      </md-card-content>
      <md-snackbar md-position="left" :md-duration="2000" :md-active.sync="showSnack" md-persistent>
        <span>{{msg}}</span>
      </md-snackbar>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'personal',
  data: () => ({
    newPassword: '',
    msg: '',
    showSnack: false
  }),
  computed: {
    nickname: {
      get () {
        return this.$store.state.user.nickname
      },
      set (value) {
        this.$store.commit('updateNickname', value)
      }
    }
  },
  methods: {
    update() {
      if (!this.newPassword) return;
      this.$http.post('/user/update', {
        uid: this.$store.state.user.uid,
        nickname: this.nickname,
        newPassword: this.newPassword
      }).then(() => {
        this.msg = '修改成功';
        this.showSnack = true;
      }).catch(res => {
        this.msg = res.msg;
        this.showSnack = true;
      })
    },
    goBack () {
      this.$router.back();
    }
  },
};
</script>

<style lang="scss" scoped>
  .header {
    .text {
      margin-left: 10px;
    }
  }

  .md-button {
    margin: 6px 8px;
  }
</style>