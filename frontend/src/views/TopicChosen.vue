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
import PersonCard from "@/components/PersonCard.vue";
import io from 'socket.io-client';
import config from '@/config';

export default {
  components: {PersonCard},
  name: 'topic-chosen',
  mounted () {
    this.$http.post('/question/getCourseAndChapter').then(data => {
      this.courses = data.filter(el => {
        return el.chapters.length;
      });
    });
    this.matchRoom = io(`${config.socketRoot}/match`);
    this.matchRoom.on('success', data => {
      if (data.userIds
          .map(id => parseInt(id))
          .findIndex(v => v === this.$store.state.user.uid) !== -1 && this.matchingId) {
        this.matchRoom.disconnect();
        this.$router.push({ path: '/battle', query: { roomId: data.roomId, chapterId: this.matchingId, chapterName: this.matchingName }});
      }
    })
  },
  beforeDestroy () {
    delete this.$options.sockets.success;
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
  .topic-chosen {
    height: 100%;
  }

  .header {
    .text {
      margin-left: 10px;
    }
  }

  .md-list {
    margin: 8px;
    border-radius: 10px;
  }

  .md-list-item-expand.md-list-item-container.md-button-clean {
    border-radius: 10px;
    border: 2px solid #0F53A1;
    background: #D7EAFF;
  }

  .md-list.md-theme-default .md-list-item-container:not(.md-list-item-default):not([disabled]):hover{
    border-radius: 10px;
    border: 2px solid #0F53A1;
    background: #D7EAFF;
  }

  .md-list-item-expand.md-list-item-container.md-button-clean.md-active{
    background: #D7EAFF;
  }

  .md-list.md-elevation-2.md-theme-default {
    padding: 0;
    background: transparent;
  }

  .md-list-item-text {
    color: #377CCD;
  }
</style>
