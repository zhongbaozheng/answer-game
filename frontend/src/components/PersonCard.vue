<template>
  <md-card class="md-primary">
    <md-card-content>
      <md-avatar class="md-large">
        <img src="@/assets/logo.png" alt="Avatar">
      </md-avatar>
      <div class="name">{{user.nickname}}</div>
      <!--<div class="level">-->
        <!--<span>等级</span>-->
        <!--<div class="exp">-->
          <!--<div class="exp-fill" :style="{width: amount + '%'}"></div>-->
        <!--</div>-->
        <!--<span>400 3级</span>-->
      <!--</div>-->
    </md-card-content>
    <md-card-actions>
      <md-button to="/personal">修改资料</md-button>
      <md-button @click="logout()" class="md-accent md-raised">退出登录</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'person-card',
  computed: mapState({
    user: state => state.user,
  }),
  data: () => ({
    amount: 50
  }),
  methods: {
    logout() {
      this.$store.commit('logout');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "~vue-material/dist/theme/engine";

  .md-card {
    margin: 8px;
  }

  .md-avatar {
    border: 3px #fff solid;
  }

  .name {
    margin: 5px 0;
  }

  .level {
    $level-color: md-get-palette-color(yellow, A400);
    display: flex;
    justify-content: center;
    align-items: center;
    color: $level-color;

    .exp {
      width: 50%;
      height: 10px;
      border: 2px $level-color solid;
      border-radius: 20px;
      margin: 0 12px;
      position: relative;

      .exp-fill {
        background-color: $level-color;
        height: 100%;
        position: absolute;
      }
    }
  }
</style>
