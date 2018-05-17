<template>
  <div class="record">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">战绩</span>
    </div>
    <person-card></person-card>
    <md-card style="over-flow: auto; height: 58%; border-radius: 10px;">
      <md-content class="record-stats md-layout md-alignment-center-space-around">
        <div class="stat">
          <div class="data">{{totalQuesstion}}</div>
          <div class="title">答题</div>
        </div>
        <div class="stat">
          <div class="data">{{totalSession}}</div>
          <div class="title">总场次</div>
        </div>
      </md-content>
      <md-divider></md-divider>
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>场次号</md-table-head>
          <md-table-head md-numeric>对战时间</md-table-head>
          <md-table-head>对战结果</md-table-head>
          <md-table-head>对手</md-table-head>
        </md-table-row>
        <md-table-row v-for="session in sessions" :key="session.sessionid">
          <md-table-head md-numeric>{{session.sessionid}}</md-table-head>
          <md-table-head md-numeric>
          <span class="fight-time">{{moment.unix(parseInt(session.fighttime)).format('YYYY-MM-DD')}}
          </span>
          <span class="fight-time">{{moment.unix(parseInt(session.fighttime)).format('hh:mm:ss')}}
          </span>
          </md-table-head>
          <md-table-head>{{session.bool}}</md-table-head>
          <md-table-head>{{session.users.userOne === $store.state.user.nickname ? session.users.userTwo: session.users.userOne}}
          </md-table-head>
          <icon name="angle-right" scale="1"></icon>
        </md-table-row>
      </md-table>
    </md-card>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from '@/components/PersonCard.vue';
import moment from 'moment';

export default {
  components: {PersonCard},
  name: 'record',
  data: () => ({
    sessions: [],
    totalQuesstion: '0',
    totalSession: '0',
    moment
  }),
  mounted () {
    this.$http.post('/user/getUserGains', {
      uid: this.$store.state.user.uid
    }).then(data => {
      this.sessions = data.sessions;
      this.totalQuesstion = data.totalQuesstion;
      this.totalSession = data.totalSession;
    });
  },
  methods: {
    goBack () {
      this.$router.back();
    }
  },
};
</script>

<style lang="scss">
  .record {
    height: 100%;
  }

  .header {
    padding: 10px 8px 0;
    color: white;
    .text {
      margin-left: 10px;
    }
  }

  .record-stats {
    padding: 5px;

    .stat {
      text-align: center;
      .data {
        margin-bottom: 5px;
      }
    }
  }

  .md-card {
    margin: 10px;
  }

  @media (max-width: 945px) {
    .md-table-head {
      max-width: 40vw;
    }
  }

  @media (min-width: 945px) {
    .md-table-head {
      max-width: 20vw;
    }
  }

  .md-table-head-container {
    text-align: center;
    padding: 0;
    height: 56px;
  }

  .fight-time {
    margin: 0;
  }

  .md-table-head-label {
    padding: 0 10px;
    height: 56px;
    line-height: 56px;
  }

  .md-table-head:last-child .md-table-head-label {
    padding-right: 10px;
  }

  .fa-icon {
    height: 56px;
    line-height: 56px;
    margin-right: 10px;
  }
</style>
