<template>
  <div class="home">
    <div class="md-layout">
      <div>通信工知识竞技对战平台</div>
    </div>
    <person-card></person-card>
    <md-button class="md-raised md-primary link" to="/topic-chosen">双人对战</md-button>
    <md-button class="md-raised md-primary link" to="/record">战绩</md-button>
    <md-button class="md-raised md-primary link" to="/ranking">排名</md-button>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from '@/components/PersonCard.vue';

export default {
  components: {PersonCard},
  name: 'home'
};
</script>

<style lang="scss" scoped>

  .link {
    width: calc(100% - 16px);
    height: 18vh;
    margin: 8px;
    font-size: 18px;
  }
</style>
