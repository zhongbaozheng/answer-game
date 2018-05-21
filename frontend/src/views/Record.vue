<template>
  <div class="record">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">战绩</span>
    </div>
    <person-card></person-card>
    <md-card style="over-flow: auto; height: 58%; border-radius: 10px;background: #4A7BCF;">
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
        <md-table-row @click="showDetails(session)" v-for="session in sessions" :key="session.sessionid">
          <md-table-head md-numeric>{{session.sessionid}}</md-table-head>
          <md-table-head md-numeric>{{moment.unix(parseInt(session.fighttime)).format('YYYY-MM-DD hh:mm:ss')}}
          </md-table-head>
          <md-table-head>
            <span v-if="session.bool === 0">平局</span>
            <span v-if="session.bool === 1" class="victory">胜利</span>
            <span v-if="session.bool === 2" class="failure">失败</span>
          </md-table-head>
          <md-table-head>{{session.users.userOne === $store.state.user.nickname ? session.users.userTwo: session.users.userOne}}
          </md-table-head>
          <icon name="angle-right" scale="1"></icon>
        </md-table-row>
      </md-table>
    </md-card>
    <md-dialog :md-active.sync="detail">
      <md-dialog-title>战绩详情</md-dialog-title>
      <md-table>
        <md-table-row>
          <md-table-head><span class="header-title">问题</span></md-table-head>
          <md-table-head><span class="header-title">我的答案</span></md-table-head>
          <md-table-head><span class="header-title">对手答案</span></md-table-head>
          <md-table-head><span class="header-title">正确答案</span></md-table-head>
        </md-table-row>
        <md-table-row v-for="(question, index) in currentDetail" :key="index">
          <md-table-head>{{question.question}}</md-table-head>
          <md-table-head>
            <span v-if="detailPlayer === 1" :class="[question.answerOne === question.right ? 'victory' : 'failure']">
              {{ question.answerOne }}
            </span>
            <span v-else  v-bind:class="[question.answerTwo === question.right ? 'victory' : 'failure']">
              {{question.answerTwo}}
            </span>
          </md-table-head>
          <md-table-head>
            <span v-if="detailPlayer === 1" :class="[question.answerTwo === question.right ? 'victory' : 'failure']">
              {{ question.answerTwo }}
            </span>
            <span v-else  v-bind:class="[question.answerOne === question.right ? 'victory' : 'failure']">
              {{question.answerOne}}
            </span>
          </md-table-head>
          <md-table-head>{{question.right}}</md-table-head>
        </md-table-row>
      </md-table>
      <md-dialog-actions>
        <md-button class="md-primary" @click="detail = false">返回</md-button>
      </md-dialog-actions>
    </md-dialog>
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
    detail: false,
    detailPlayer: 0,
    currentDetail: [],
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
    },
    showDetails (session) {
      if (session.users.userOne === this.$store.state.user.nickname) {
        this.detailPlayer = 1;
      } else {
        this.detailPlayer = 2;
      }
      this.currentDetail = session.details;
      this.detail = true;
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
    color: white;
  }

  .fight-time {
    margin: 0;
  }

  .md-table-head-label {
    padding: 0 3px;
    height: 56px;
    line-height: 56px;
  }

  .md-table-head:last-child .md-table-head-label {
    padding-right: 3px;
  }

  .fa-icon {
    height: 56px;
    line-height: 56px;
    margin-right: 10px;
  }

  .victory {
    color: #44D31F;
  }

  .failure {
    color: #F97B98;
  }

  .header-title {
    font-size: 15px;
  }

  .md-content.record-stats.md-layout.md-alignment-center-space-around.md-theme-default,.md-content.md-table-content.md-scrollbar.md-theme-default,.md-dialog-container{
    background: #4A7BCF;
    color: white;
  }

  .md-button-content {
    color: white;
  }

  .md-table-head-container {
    font-size: 14px;
  }
</style>
