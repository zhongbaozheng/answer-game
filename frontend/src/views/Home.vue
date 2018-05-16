<template>
  <div class="home">
    <div class="md-layout">
      <p>通信工知识竞技对战平台</p>
    </div>
    <person-card></person-card>
    <img id="fight" src="../assets/fight_bg.jpg" class="md-raised md-primary link" @click="$router.push('/topic-chosen')" />
    <img id="record" src="../assets/record_bg.jpg" class="md-raised md-primary link" @click="$router.push('/record')" />
    <img id="rank" src="../assets/rank_bg.jpg" class="md-raised md-primary link" @click="$router.push('/ranking')" />
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

  .home {
    height: 100%;
    background: transparent;
  }
  
  .md-layout p {
    font-size: 16px;
    color: white;
    margin-top: 2vh;
    margin-left: 2vw;
  }

  .link {
    width: calc(100% - 16px);
    margin: 5px 1%;
    border-radius: 10px;
    font-size: 18px;
  }

  #record, #rank {
    width: 47%;
  }
</style>
