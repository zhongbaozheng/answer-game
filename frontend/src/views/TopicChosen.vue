<template>
  <div class="home">
    <div class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">双人对战</span>
    </div>
    <person-card></person-card>
    <md-tabs class="md-primary md-elevation-2" md-alignment="centered">
      <md-tab v-for="course in courses" :id="course.courseId" :md-label="course.course">
        <md-button class="md-raised md-primary" v-for="chapter in course.chapters" to="/competition">{{chapter.chapter}}</md-button>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from "../components/PersonCard.vue";

export default {
  components: {PersonCard},
  name: 'home',
  data: () => ({
    amount: 50,
    courses: [
      {
        courseId: '1',
        course: '123',
        chapters: [
          {
            chapter: '123'
          },
          {
            chapter: '123'
          },
        ]
      },
      {
        courseId: '2',
        course: '123',
        chapters: [
          {
            chapter: '123'
          },
          {
            chapter: '123'
          },
        ]
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
  .header {
    .text {
      margin-left: 10px;
    }
  }
</style>
