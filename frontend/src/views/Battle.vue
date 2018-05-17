<template>
  <div>
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">对战</span>
    </div>
    <div v-if="!showingRecord" class="battle md-elevation-2">
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
          <div>{{myRightCount}}/{{questions.length}}</div>
        </div>
        <div class="md-layout-item">
          <p class="question">{{currentQuestion}}</p>
          <div class="answers">
            <div v-for="option in currentOptions" @click="select(option)" class="answer-option md-elevation-1">{{option.name}}: {{option.value}}</div>
          </div>
        </div>
        <div class="counter">
          <div class="bar">
            <div class="fill" :style="{height: `${20 * opponentRightCount}%`}"></div>
          </div>
          <div>{{opponentRightCount}}/{{questions.length}}</div>
        </div>
      </div>
    </div>
    <div v-if="showingRecord" class="battle md-elevation-2">
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
          <div class="chapter">对战回顾</div>
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
        <div class="switch" @click="switchRecord(-1)" :class="{hidden: currentRecordIndex === 0}">
          <icon name="angle-left" scale="2"></icon>
        </div>
        <div class="md-layout-item">
          <p class="question">{{currentRecordQuestion}}</p>
          <p class="tips" v-if="!currentRecordAnswer || currentRecordAnswer === 'no'">本题未选择答案</p>
          <div class="answers">
            <div v-for="option in currentRecordOptions" class="answer-option md-elevation-1" :class="{
              correct: currentRecordAnswer === option.name && currentRecordAnswer === currentRecordQuestionAnswer,
              error: currentRecordAnswer === option.name && currentRecordAnswer !== currentRecordQuestionAnswer
            }">{{option.name}}: {{option.value}}</div>
          </div>
        </div>
        <div class="switch" @click="switchRecord(1)" :class="{hidden: currentRecordIndex === (this.questions.length - 1)}">
          <icon name="angle-right" scale="2"></icon>
        </div>
      </div>
    </div>
    <md-snackbar md-position="left" :md-duration="1000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{snackMsg}}</span>
    </md-snackbar>
    <md-dialog :md-active.sync="waiting" :md-fullscreen="false" :md-click-outside-to-close="false" :md-close-on-esc="false">
      <md-dialog-title>{{waitMsg}}</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="goBack()">放弃比赛</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="result" :md-fullscreen="false" :md-click-outside-to-close="false" :md-close-on-esc="false">
      <md-dialog-title>{{resultMsg}}</md-dialog-title>
      <p class="uploading" v-if="uploading">结果上传中……</p>
      <md-dialog-actions>
        <md-button :disabled="uploading" class="md-primary" @click="showRecord()">查看本次对战回顾</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client';
import config from '@/config';

export default {
  name: 'battle',
  computed: {
    currentRecordAnswer () {
      if (this.me && this.me.answers && this.questions && this.questions[this.currentRecordIndex]) {
        const answer = this.me.answers.find(a => a.questionId === this.questions[this.currentRecordIndex].questionId);
        if (answer) {
          return answer.answer;
        }
      }
      return false;
    }
  },
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
    timer: null,
    isOver: false,
    showingRecord: false,
    currentRecordQuestion: '',
    currentRecordOptions: [],
    currentRecordQuestionAnswer: '',
    currentRecordIndex: 0
  }),
  mounted () {
    // 取得对战相关信息
    const query = this.$router.currentRoute.query;
    this.roomId = query.roomId;
    this.chapterId = query.chapterId;
    this.chapterName = query.chapterName;
    this.questions = [];

    // 连接对战房间并且发送准备信号
    const playRoom = io(`${config.socketRoot}/room/${this.roomId}`);
    playRoom.emit('ready', { userId: this.$store.state.user.uid, chapterId: this.chapterId });

    // 接收到开始信号时初始化对战所需的变量并开始计时
    playRoom.on('begin', ({playerOne, playerTwo, questions}) => {
      console.log('begin');
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
      this.currentRecordQuestion = this.questions[this.currentRecordIndex].question;
      this.currentRecordOptions = this.questions[this.currentRecordIndex].options;
      this.currentRecordQuestionAnswer = this.questions[this.currentRecordIndex].answer;
      this.waiting = false;
      this.startTimer();
    });

    // 对手答题时判断是否正确并记录对手答案
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

    /**
     * 对战结束时
     * 1. 判断是否已经完成了答题等待对手完成，如果是关掉等待窗口
     * 2. 判断是否对手退出导致的对战完成，显示不同结果
     * 3. 判断是否需要自己上传对战记录，如果是上传
     * 4. 标记对战完成并断开连接
     */
    playRoom.on('over', ({opponentQuit, requestUserId}) => {
      if (this.waiting) {
        this.waiting = false;
      }

      if (opponentQuit === true) {
        this.showQuitResult();
      } else {
        this.showResult();
      }

      if (requestUserId === this.$store.state.user.uid) {
        this.uploading = true;
        this.$http.post('/brain/saveAnswers', {
          result : [{
            userId : this.me.uid,
            answers : this.me.answers
          },{
            userId : this.opponent.uid,
            answers : this.opponent.answers
          }]
        }).then(data => {
          console.log('上传答案成功');
          this.uploading = false;
        });
      }
      this.isOver = true;
      playRoom.disconnect(true)
    });

    this.playRoom = playRoom;
  },
  // 用户离开这个页面的时候，如果还未完成答题直接发送退出信号并且断开连接
  beforeDestroy () {
    if (!this.isOver) {
      this.playRoom.emit('quit', { userId: this.$store.state.user.uid, chapterId: this.chapterId });
      this.playRoom.disconnect(true)
    }
  },
  methods: {
    // 倒计时
    startTimer () {
      if (this.timer) window.clearInterval(this.timer);
      this.time = 10;
      this.timer = window.setInterval(() => {
        this.time--;
        if(this.time === 0) {
          window.clearInterval(this.timer);
          this.select({name: 'no'});
        }
      }, 1000);
    },
    goBack () {
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
      if (this.opponent) {
        this.resultMsg = `@${this.opponent.userName} 落荒而逃，你赢得了比赛。`;
        this.result = true;
      }
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
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex].question;
        this.currentOptions = this.questions[this.currentQuestionIndex].options;
        this.startTimer();
      } else {
        this.playRoom.emit('finish', {userId: this.$store.state.user.uid});
        this.showWaitingMethod('你已完成答题，请等待对手完成');
        if (this.timer) window.clearInterval(this.timer);
      }
    },
    showRecord () {
      this.showingRecord = true;
      this.result = false;
    },
    switchRecord (i) {
      this.currentRecordIndex += i;
      this.currentRecordQuestion = this.questions[this.currentRecordIndex].question;
      this.currentRecordOptions = this.questions[this.currentRecordIndex].options;
      this.currentRecordQuestionAnswer = this.questions[this.currentRecordIndex].answer;
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  $yellow-color: md-get-palette-color(yellow, A400);

  .header {
    padding: 10px 8px 0;
    color: white;
    .text {
      margin-left: 10px;
    }
  }

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

    .switch {
      margin: 10px;
      border: none;
      padding: 0;
      box-shadow: 0 2px 5px rgba(0,0,0,.16);
      border-radius: 2px;
      width: 40px;
      background-color: #f5f6f7;
      color: #888;
      position: relative;

      &.hidden {
        visibility: hidden;
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
      }
    }

    .tips {
      font-size: 12px;
    }

    .answers {
      display: flex;
      flex-direction: column;
      align-items: center;

      .answer-option {
        margin: 0 0 15px;
        padding: 8px;
        width: 70%;
        background-color: #fff;
        border-radius: 3px;
        color: rgba(0, 0, 0, 0.87);
        word-break: break-all;

        &.correct {
          background-color: rgba(0, 224, 0, 0.87);
        }

        &.error {
          background-color: #f7943e;
        }
      }
    }

    .uploading {
      padding: 8px;
    }
  }
</style>
