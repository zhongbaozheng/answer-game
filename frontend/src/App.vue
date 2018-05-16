<template>
  <div id="app" class="md-layout md-alignment-center-center">
    <div class="bg"></div>
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

.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  background: #216EC6 url('./assets/bg.jpg') no-repeat bottom;
  background-size:  100%;
  z-index: -1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}  
</style>
