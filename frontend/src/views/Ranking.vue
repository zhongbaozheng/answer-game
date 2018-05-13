<template>
  <div class="ranking">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">排名</span>
    </div>
    <person-card></person-card>
    <md-card>
      <md-table>
        <md-table-row v-if="myRanking">
          <md-table-head md-numeric>{{myRanking.rank}}</md-table-head>
          <md-table-head>{{myRanking.nickname}}</md-table-head>
          <md-table-head>答题数：{{myRanking.totalQuesstion}}</md-table-head>
        </md-table-row>
        <md-table-row v-for="ranking in theirRanking">
          <md-table-head md-numeric>{{ranking.rank}}</md-table-head>
          <md-table-head>{{ranking.nickname}}</md-table-head>
          <md-table-head>答题数：{{ranking.totalQuesstion}}</md-table-head>
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
