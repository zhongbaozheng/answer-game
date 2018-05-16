<template>
  <div id="app" class="md-layout md-alignment-center-center">
    <router-view class="md-layout-item md-small-size-100 md-size-50"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    computed: mapState({
      user: state => state.user,
      mchId: state => state.mchId
    }),
    mounted () {
      // 如果当前是在登录状态中，发送 online
      if (this.user) {
        this.$socket.emit('online', { userId: this.user.uid, mchId: this.mchId });
      }

      //当 user 登录之后发送 online
      this.$watch('user', () => {
        if (this.user) {
          this.$socket.emit('online', { userId: this.user.uid, mchId: this.mchId });
        } else {
          this.$router.replace('/login');
        }
      });

      //每一次重连都要重新发送 online
      this.$socket.on('connect', ()=> {
        if (this.user) {
          this.$socket.emit('online', { userId: this.user.uid, mchId: this.mchId });
        }
      });

      this.$socket.on('logout', ({userId, mchId}) => {
        if (this.user && this.user.uid === userId && this.mchId !== mchId) {
          this.$store.commit('logout');
        }
      });
      this.$socket.on('fight', ({userIds, chapterId, roomId, chapterName}) => {
        if (userIds
            .map(id => parseInt(id))
            .findIndex(v => v === this.user.uid) !== -1) {
          if (this.$router.currentRoute.name === 'battle') {
            this.$router.replace({ path: '/battle', query: { roomId, chapterId, chapterName }});
          } else {
            this.$router.push({ path: '/battle', query: { roomId, chapterId, chapterName }});
          }
        }
      })
    }
  };
</script>

<style lang="scss">
html,body,#app {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/bg.png');
  background-repeat: no-repeat;
  background-color: #216EC6;
  background-size: 100%;
  background-position: bottom;
}

@media screen and (min-width: 945px) {
  #app {
    background-image: url('./assets/bg.jpg');
  }
}
</style>
