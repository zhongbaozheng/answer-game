<template>
  <div>
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">对战</span>
    </div>
    <div class="battle md-elevation-2">
      <div class="battle-header">
        <div v-if="me" class="me">
          <div class="avatar">
            <md-avatar class="md-large">
              <img src="@/assets/logo.png" alt="Avatar">
            </md-avatar>
          </div>
          <span>{{me.userName}}</span>
        </div>
        <div class="timer">
          <div class="seconds">{{time}}S</div>
          <div class="chapter">{{chapterName}}</div>
        </div>
        <div v-if="opponent" class="opponent">
          <div class="avatar">
            <md-avatar class="md-large">
              <img src="@/assets/logo.png" alt="Avatar">
            </md-avatar>
          </div>
          <span>{{opponent.userName}}</span>
        </div>
      </div>
      <div class="md-layout">
        <div class="counter">
          <div class="bar">
            <div class="fill" :style="{height: `${20 * myRightCount}%`}"></div>
          </div>
          <div>{{myRightCount}}/5</div>
        </div>
        <div class="md-layout-item">
          <template >
            <p class="question">{{currentQuestion}}</p>
            <div class="answers">
              <md-button v-for="option in currentOptions" @click="select(option)" class="md-raised">{{option.name}}: {{option.value}}</md-button>
            </div>
          </template>
        </div>
        <div class="counter">
          <div class="bar">
            <div class="fill" :style="{height: `${20 * opponentRightCount}%`}"></div>
          </div>
          <div>{{opponentRightCount}}/5</div>
        </div>
      </div>
    </div>
    <md-snackbar md-position="left" :md-duration="1000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{snackMsg}}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
    </md-snackbar>
    <md-dialog :md-active.sync="waiting">
      <md-dialog-title>{{waitMsg}}</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="goBack()">放弃比赛</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="result">
      <md-dialog-title>{{resultMsg}}</md-dialog-title>
      <p v-if="uploading">结果上传中……</p>
      <md-dialog-actions>
        <md-button :disabled="uploading" class="md-primary" @click="goBack()">返回</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'battle',
  data: () => ({
    second: 10,
    me: null,
    opponent: null,
    roomId: '',
    chapterId: '',
    chapterName: '',
    waitMsg: '正在等待你的对手进入房间……',
    waiting: true,
    currentQuestion:  '',
    currentOptions: [],
    currentQuestionIndex: 0,
    myRightCount: 0,
    opponentRightCount: 0,
    snackMsg: '',
    showSnackbar: false,
    result: false,
    resultMsg: '',
    uploading: false,
    time: 10,
    timer: null
  }),
  mounted () {
    const query = this.$router.currentRoute.query;
    this.roomId = query.roomId;
    this.chapterId = query.chapterId;
    this.chapterName = query.chapterName;
    this.questions = [];

    const playRoom = io(`http://http://125.216.112.121:8001/room/${this.roomId}`);
    playRoom.emit('ready', { userId: this.$store.state.user.uid, chapterId: this.chapterId });
    playRoom.on('begin', ({playerOne, playerTwo, questions}) => {
      if (parseInt(playerOne.uid) === this.$store.state.user.uid) {
        this.me = playerOne;
        this.opponent = playerTwo;
      } else {
        this.me = playerTwo;
        this.opponent = playerOne;
      }
      this.me.answers = [];
      this.opponent.answers = [];
      this.questions = questions;
      this.currentQuestion = this.questions[this.currentQuestionIndex].question;
      this.currentOptions = this.questions[this.currentQuestionIndex].options;
      this.waiting = false;
      this.startTimer();
    });

    playRoom.on('opponentAnswer', ({ questionId, answer }) => {
      this.opponent.answers = this.opponent.answers || [];
      this.opponent.answers.push({ questionId, answer });
      const questionIndex = this.questions.findIndex(v => v.questionId === questionId);
      if (questionIndex !== -1) {
        if (this.questions[questionIndex].answer === answer) {
          this.opponentRightCount++;
          this.showSnackBarMethod('你的对手答对了一题！');
        }
      }
    });

    playRoom.on('over', ({opponentQuit, requestUserId}) => {
      if (opponentQuit === true) {
        this.showQuitResult();
      }
      if (requestUserId === this.$store.state.user.uid) {
        this.uploading = true;
        this.$http.post('/brain/saveAnswers', {
          result : [{
            userId : this.me.uid,
            answers : this.me.answers.filter(a => a.answer !== 'TimeOut')
          },{
            userId : this.opponent.uid,
            answers : this.opponent.answers.filter(a => a.answer !== 'TimeOut')
          }]
        }).then(data => {
          this.uploading = false;
        });
      }
      playRoom.disconnect(true)
    });

    this.playRoom = playRoom;
  },
  methods: {
    startTimer () {
      if (this.timer) window.clearInterval(this.timer);
      this.time = 10;
      this.timer = window.setInterval(() => {
        this.time--;
        if(this.time === 0) {
          window.clearInterval(this.timer);
          this.select({name: 'TimeOut'});
        }
      }, 1000);
    },
    goBack () {
      this.playRoom.emit('quit', { userId: this.$store.state.user.uid, chapterId: this.chapterId });
      this.$router.back();
    },
    showSnackBarMethod (msg) {
      this.snackMsg = msg;
      this.showSnackbar = true;
    },
    showWaitingMethod (msg) {
      this.waitMsg = msg;
      this.waiting = true;
    },
    showResult () {
      if (this.myRightCount > this.opponentRightCount) {
        this.resultMsg = `恭喜你战胜了 @${this.opponent.userName}。`;
      } else if (this.myRightCount < this.opponentRightCount) {
        this.resultMsg = `很遗憾你被 @${this.opponent.userName} 打败了`;
      } else {
        this.resultMsg = `你跟 @${this.opponent.userName} 握手言和`;
      }
      this.result = true;
    },
    showQuitResult () {
      this.resultMsg = `@${this.opponent.userName} 落荒而逃，你赢得了比赛。`;
      this.result = true;
    },
    select (option) {
      this.me.answers = this.me.answers || [];
      const answer = { questionId: this.questions[this.currentQuestionIndex].questionId, answer: option.name };
      this.me.answers.push(answer);
      this.playRoom.emit('answer', answer);
      if (this.questions[this.currentQuestionIndex].answer === option.name) {
        this.myRightCount++;
        this.showSnackBarMethod('你答对了~~');
      }
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < 5) {
        this.currentQuestion = this.questions[this.currentQuestionIndex].question;
        this.currentOptions = this.questions[this.currentQuestionIndex].options;
        this.startTimer();
      } else {
        this.playRoom.emit('finish', {userId: this.$store.state.user.uid});
        this.showResult();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  $yellow-color: md-get-palette-color(yellow, A400);

  .battle {
    width: 100%;
    height: 92vh;
    background-color: md-get-palette-color(blue, 500);
    border-radius: 10px;
    color: #fff;

    .battle-header {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;

      .avatar {
        padding: 5px;
      }

      .timer {
        .seconds {
          width: 74px;
          height: 74px;
          text-align: center;
          line-height: 74px;
          color: $yellow-color;
        }
      }

      .me {
        .avatar {
          background-color: md-get-palette-color(red, A200);
          padding-left: 25px;
          border-bottom-right-radius: 50px;
          border-top-right-radius: 50px;
        }
      }

      .opponent {
        .avatar {
          background-color: md-get-palette-color(blue, 300);
          padding-right: 25px;
          border-bottom-left-radius: 50px;
          border-top-left-radius: 50px;
        }
      }
    }

    .counter {
      color: $yellow-color;
      margin-top: 30px;

      .bar {
        height: 60vh;
        width: 14px;
        position: relative;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 20px;
        margin: 10px;

        .fill {
          position: absolute;
          border-radius: 20px;
          bottom: 0;
          width: 100%;
          height: 20%;
          background-color: $yellow-color;
        }
      }
    }

    .answers {
      display: flex;
      flex-direction: column;
      align-items: center;

      .md-button {
        margin: 0 0 15px;
        width: 70%;
        word-wrap:break-word;
        white-space: normal;
      }
    }
  }
</style>
