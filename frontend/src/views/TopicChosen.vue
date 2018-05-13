<template>
  <div class="topic-chosen">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">双人对战</span>
    </div>
    <person-card></person-card>
    <md-list class="md-elevation-2">
      <md-list-item v-for="course in courses" md-expand>
        <span class="md-list-item-text">{{course.course}}</span>
        <md-list slot="md-expand">
          <md-list-item @click="startBattle(chapter.chapterId)" v-for="chapter in course.chapters" class="md-inset">{{chapter.chapter}}</md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from "../components/PersonCard.vue";

export default {
  components: {PersonCard},
  name: 'topic-chosen',
  mounted () {
    this.$http.post('/question/getCourseAndChapter').then(data => {
      this.courses = data.filter(el => {
        return el.chapters.length;
      });
    })
  },
  methods: {
    startBattle (id) {
      console.log(id);
    },
    goBack () {
      this.$router.back();
    }
  },
  data: () => ({
    amount: 50,
    courses: []
  })
};
</script>

<style lang="scss" scoped>
  .header {
    .text {
      margin-left: 10px;
    }
  }

  .md-list {
    margin: 8px;
  }
</style>
