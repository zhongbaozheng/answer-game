<template>
  <div id="app" class="md-layout md-alignment-center-center">
    <router-view class="md-layout-item md-small-size-100 md-size-50"/>
    <md-dialog :md-active.sync="showFight">
      <md-dialog-title>新的挑战出现了，是否迎接挑战？</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="fight()">迎接</md-button>
        <md-button class="md-accent" @click="donotFight()">不迎接</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    data: () => ({
      showFight: false,
      newFight: {
        roomId: '',
        chapterId: -1,
        chapterName: ''
      }
    }),
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
        if (this.user && this.user.uid === userId && this.mchId === mchId) {
          this.$store.commit('logout');
        }
      });
      this.$socket.on('fight', ({userIds, chapterId, roomId, chapterName}) => {
        if (userIds
            .map(id => parseInt(id))
            .findIndex(v => v === this.user.uid) !== -1) {
          this.showFight = true;
          this.newFight.roomId = roomId;
          this.newFight.chapterId = chapterId;
          this.newFight.chapterName = chapterName;
        }
      })
    },
    methods: {
      fight () {
        this.showFight = false;
        this.$router.push({ path: 'battle', query: this.newFight});
      },
      donotFight () {
        this.showFight = false;
      }
    }
  };
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2vw;
}
</style>
