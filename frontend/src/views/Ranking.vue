<template>
  <div class="ranking">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">排名</span>
    </div>
    <person-card></person-card>
    <md-card>
      <md-table>
        <md-table-row v-if="myRanking && parseInt(myRanking.rank) == 1" class="my-rank">
          <md-table-head md-numeric><span class="first-rank-position">{{myRanking.rank}}</span></md-table-head>
          <md-table-head><span class="first-rank-content">{{myRanking.nickname}}</span></md-table-head>
          <md-table-head><span class="first-rank-content">胜场：{{myRanking.accuacy}}</span></md-table-head>
          <md-table-head><span class="first-rank-content">总场次：{{myRanking.totalSession}}</span></md-table-head>
        </md-table-row>
        <md-table-row v-else-if="myRanking && parseInt(myRanking.rank) == 2" class="my-rank">
          <md-table-head md-numeric><span class="second-rank-position">{{myRanking.rank}}</span></md-table-head>
          <md-table-head><span class="second-rank-content">{{myRanking.nickname}}</span></md-table-head>
          <md-table-head><span class="second-rank-content">胜场：{{myRanking.accuacy}}</span></md-table-head>
          <md-table-head><span class="second-rank-content">总场次：{{myRanking.totalSession}}</span></md-table-head>
        </md-table-row>
        <md-table-row v-else-if="myRanking && parseInt(myRanking.rank) == 3" class="my-rank">
          <md-table-head md-numeric><span class="third-rank-position">{{myRanking.rank}}</span></md-table-head>
          <md-table-head><span class="third-rank-content">{{myRanking.nickname}}</span></md-table-head>
          <md-table-head><span class="third-rank-content">胜场：{{myRanking.accuacy}}</span></md-table-head>
          <md-table-head><span class="third-rank-content">总场次：{{myRanking.totalSession}}</span></md-table-head>
        </md-table-row>
        <md-table-row v-else-if="myRanking && parseInt(myRanking.rank) > 3" class="my-rank">
          <md-table-head md-numeric><span class="my-rank-position">{{myRanking.rank}}</span></md-table-head>
          <md-table-head><span class="my-rank-content">{{myRanking.nickname}}</span></md-table-head>
          <md-table-head><span class="my-rank-content">胜场：{{myRanking.accuacy}}</span></md-table-head>
          <md-table-head><span class="my-rank-content">总场次：{{myRanking.totalSession}}</span></md-table-head>
        </md-table-row>
        <template v-for="(ranking, index) in theirRanking">
          <md-table-row v-if="index == 0">
            <md-table-head md-numeric><span class="first-rank-position">{{ranking.rank}}</span></md-table-head>
            <md-table-head><span class="first-rank-content">{{ranking.nickname}}</span></md-table-head>
            <md-table-head><span class="first-rank-content">胜场：{{ranking.accuacy}}</span></md-table-head>
            <md-table-head><span class="first-rank-content">总场次：{{ranking.totalSession}}</span></md-table-head>
          </md-table-row>
          <md-table-row v-else-if="index == 1">
            <md-table-head md-numeric><span class="second-rank-position">{{ranking.rank}}</span></md-table-head>
            <md-table-head><span class="second-rank-content">{{ranking.nickname}}</span></md-table-head>
            <md-table-head><span class="second-rank-content">胜场：{{ranking.accuacy}}</span></md-table-head>
            <md-table-head><span class="second-rank-content">总场次：{{ranking.totalSession}}</span></md-table-head>
          </md-table-row>
          <md-table-row v-else-if="index == 2">
            <md-table-head md-numeric><span class="third-rank-position">{{ranking.rank}}</span></md-table-head>
            <md-table-head><span class="third-rank-content">{{ranking.nickname}}</span></md-table-head>
            <md-table-head><span class="third-rank-content">胜场：{{ranking.accuacy}}</span></md-table-head>
            <md-table-head><span class="third-rank-content">总场次：{{ranking.totalSession}}</span></md-table-head>
          </md-table-row>
          <md-table-row v-else>
            <md-table-head md-numeric><span class="other-rank-position">{{ranking.rank}}</span></md-table-head>
            <md-table-head><span class="other-rank-content">{{ranking.nickname}}</span></md-table-head>
            <md-table-head><span class="other-rank-content">胜场：{{ranking.accuacy}}</span></md-table-head>
            <md-table-head><span class="other-rank-content">总场次：{{ranking.totalSession}}</span></md-table-head>
          </md-table-row>
        </template>
      </md-table>
    </md-card>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from '@/components/PersonCard.vue';

export default {
  components: {PersonCard},
  name: 'ranking',
  data: () => ({
    myRanking: null,
    theirRanking: []
  }),
  mounted () {
    this.$http.post('/user/getRank', {
      uid: this.$store.state.user.uid
    }).then(data => {
      this.myRanking = data.user;
      this.theirRanking = data.users;
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
  .ranking {
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

  .md-card.md-theme-default {
    border-radius: 10px;
  }

  .my-rank {
    border-bottom: 1px dashed black;
  }

  .my-rank-position {
    background: #656566;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: white;
    border-radius: 50%;
  }

  .my-rank-content {
    color: #656566;
  }

  .first-rank-position {
    background: #FC2272;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: white;
    border-radius: 50%;
  }

  .first-rank-content {
    color: #FC2272;
  }

  .second-rank-position {
    background: #FFA127;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: white;
    border-radius: 50%;
  }

  .second-rank-content {
    color: #FFA127;
  }

  .third-rank-position {
    background: #44D31F;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: white;
    border-radius: 50%;
  }

  .third-rank-content {
    color: #44D31F;
  }

  .other-rank-position {
    background: transparent;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: #656566;
    border-radius: 50%;
    border: 1px solid #656566;
  }

  .other-rank-content {
    color: #656566;
  }

  .md-content.md-table.md-theme-default {
    over-flow: auto;
    height: 61vh;
  }

</style>
