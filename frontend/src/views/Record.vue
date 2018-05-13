<template>
  <div class="record">
    <div class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">战绩</span>
    </div>
    <person-card></person-card>
    <md-card></md-card>
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
  .header {
    .text {
      margin-left: 10px;
    }
  }
</style>
