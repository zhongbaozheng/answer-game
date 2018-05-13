<template>
    <md-card>
      <md-card-header>
        <div class="md-title">登录</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-size-75 md-alignment-center">
          <md-field class="md-layout-item md-size-75">
            <label>用户名/学号</label>
            <md-input v-model="username"></md-input>
          </md-field>
          <md-field class="md-layout-item md-size-75">
            <label>密码</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-button class="md-raised md-primary md-layout-item md-size-75">登录</md-button>
          <md-button to="/register" class="md-flat md-primary md-layout-item md-size-75">尚未注册？</md-button>
        </div>
      </md-card-content>
    </md-card>
</template>

<script>

export default {
    name: 'login',
    data: () => ({
        username: '',
        password: ''
    })
};
</script>

<style lang="scss" scoped>
  .md-button {
    margin: 6px 8px;
  }
</style>