<template>
  <md-card>
    <md-card-content>
      <md-avatar class="md-large">
        <img src="@/assets/avatar.png" alt="Avatar">
      </md-avatar>
      <div class="md-layout md-size-75 md-alignment-center">
        <md-field class="md-layout-item md-size-75">
          <label>姓名</label>
          <md-input v-model="nickname"></md-input>
        </md-field>
        <md-field class="md-layout-item md-size-75">
          <label>姓名</label>
          <md-input v-model="nickname"></md-input>
        </md-field>
        <md-field class="md-layout-item md-size-75">
          <label>密码</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-button class="md-raised md-primary md-layout-item md-size-75">确认更改</md-button>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>

export default {
    name: 'personal',
    data: () => ({
        nickname: '',
        password: ''
    })
};
</script>

<style lang="scss" scoped>
  .md-button {
    margin: 6px 8px;
  }
</style>