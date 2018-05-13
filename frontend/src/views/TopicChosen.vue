<template>
  <div class="topic-chosen">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">双人对战</span>
    </div>
    <person-card></person-card>
    <md-list class="md-elevation-2">
      <md-list-item v-for="course in courses" :key="course.courseId" md-expand>
        <span class="md-list-item-text">{{course.course}}</span>
        <md-list slot="md-expand">
          <md-list-item :key="chapter.chapterId" @click="startBattle(chapter.chapterId, chapter.chapter)" v-for="chapter in course.chapters" class="md-inset">{{chapter.chapter}}</md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
    <md-dialog :md-active.sync="showMatching">
      <md-dialog-title>正在寻找与你实力相当的对手……</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="cancelMatch()">退出匹配</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import PersonCard from "../components/PersonCard.vue";
import io from 'socket.io-client';

export default {
  components: {PersonCard},
  name: 'topic-chosen',
  mounted () {
    this.$http.post('/question/getCourseAndChapter').then(data => {
      this.courses = data.filter(el => {
        return el.chapters.length;
      });
    });

    this.matchRoom = io('http://localhost:8001/match');
    this.matchRoom.on('success', data => {
      console.log(data);
      if (data.userIds
          .map(id => parseInt(id))
          .findIndex(v => v === this.$store.state.user.uid) !== -1) {
        this.matchRoom.disconnect();
        this.$router.push({ path: 'battle', query: { roomId: data.roomId, chapterId: this.matchingId, chapterName: this.matchingName }});
      }
    })
  },
  methods: {
    startBattle (id, name) {
      if (this.matchingId) return;
      this.matchRoom.open();
      this.matchRoom.emit('start', { userId: this.$store.state.user.uid, chapterId: id });
      this.matchingId = id;
      this.matchingName = name;
      this.showMatching = true;
    },
    cancelMatch () {
      this.matchRoom.disconnect();
      this.matchRoom.emit('cancel', { userId: this.$store.state.user.uid, chapterId: this.matchingId });
      this.matchingId = '';
      this.matchingName = '';
      this.showMatching = false;
    },
    goBack () {
      this.$router.back();
    }
  },
  data: () => ({
    amount: 50,
    courses: [],
    showDialog: false,
    showMatching: false,
    matchingId: '',
    matchingName: '',
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
