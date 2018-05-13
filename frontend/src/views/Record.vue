<template>
  <div class="record">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">战绩</span>
    </div>
    <person-card></person-card>
    <md-card>
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
          <md-table-head md-numeric>作答时间</md-table-head>
          <md-table-head>题目名称</md-table-head>
          <md-table-head>做过的次数</md-table-head>
        </md-table-row>
        <md-table-row v-for="question in questionRecord">
          <md-table-head md-numeric>{{question.answertime}}</md-table-head>
          <md-table-head>{{question.question}}</md-table-head>
          <md-table-head>{{question.count}}</md-table-head>
        </md-table-row>
      </md-table>
    </md-card>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from '@/components/PersonCard.vue';

export default {
  components: {PersonCard},
  name: 'record',
  data: () => ({
    questionRecord: [],
    totalQuesstion: '0',
    totalSession: '0'
  }),
  mounted () {
    this.$http.post('/user/getUserGains', {
      uid: this.$store.state.user.uid
    }).then(data => {
      this.questionRecord = data.questionRecord;
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

<style lang="scss" scoped>
  .header {
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
</style>
