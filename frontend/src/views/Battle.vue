<template>
  <div>
    <div @click="showQuiting()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">对战</span>
    </div>
    <div v-if="!showingRecord" class="battle md-elevation-2">
      <div class="battle-header">
        <div v-if="me" class="me">
          <div class="avatar">
            <md-avatar class="md-large">
              <img v-if="me.avatarurl" :src="me.avatarurl" alt="Avatar">
              <img v-else="" src="@/assets/avatar.jpg" alt="Avatar">
            </md-avatar>
          </div>
          <span class="user-name">{{me.userName}}</span>
        </div>
        <div class="timer">
          <div class="seconds">{{time}}S</div>
          <div class="chapter">{{chapterName}}</div>
        </div>
        <div v-if="opponent" class="opponent">
          <div class="avatar">
            <md-avatar class="md-large">
              <img v-if="opponent.avatarurl" :src="opponent.avatarurl" alt="Avatar">
              <img v-else="" src="@/assets/avatar.jpg" alt="Avatar">
            </md-avatar>
          </div>
          <span>{{opponent.userName}}</span>
        </div>
      </div>
      <div class="md-layout">
        <div class="counter">
          <div class="bar">
            <div class="fill" :style="{height: `${ myHeight }%`}"></div>
          </div>
          <div>{{myScore}}</div>
        </div>
        <div class="md-layout-item">
          <p class="question">{{currentQuestion}}</p>
          <div class="answers">
            <div v-for="(option, index) in currentOptions" @click="select(option, index)" class="answer-option md-elevation-1" :class="{'correct': ((currentMeAnswer === option.name) || (currentMeAnswer && currentOpponentAnswer)) && option.name === questions[currentQuestionIndex].answer,'error': (currentMeAnswer === option.name || (currentMeAnswer && currentOpponentAnswer == option.name)) && option.name !== questions[currentQuestionIndex].answer}">
              {{option.name}}: {{option.value}}
              <template v-if="questions[currentQuestionIndex].answer === option.name">
                <icon v-if="option.name === currentMeAnswer" name="check-circle" class="select my-select" scale="1"></icon>
                <icon v-if="option.name === currentOpponentAnswer" name="check-circle" class="select opponent-select" scale="1"></icon>
              </template>
              <template v-else>
                <icon v-if="option.name === currentMeAnswer" name="times-circle" class="select my-select" scale="1"></icon>
                <icon v-if="option.name === currentOpponentAnswer" name="times-circle" class="select opponent-select" scale="1"></icon>
              </template>
            </div>
          </div>
        </div>
        <div class="counter">
          <div class="bar">
            <div class="fill" :style="{height: `${ opponentHeight }%`}"></div>
          </div>
          <div>{{opponentScore}}</div>
        </div>
      </div>
    </div>
    <div v-if="showingRecord" class="battle md-elevation-2">
      <div class="battle-header">
        <div v-if="me" class="me">
          <div class="avatar">
            <md-avatar class="md-large">
              <img v-if="me.avatarurl" :src="me.avatarurl" alt="Avatar">
              <img v-else="" src="@/assets/avatar.jpg" alt="Avatar">
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
              <img v-if="opponent.avatarurl" :src="opponent.avatarurl" alt="Avatar">
              <img v-else="" src="@/assets/avatar.jpg" alt="Avatar">
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
          <p class="tips" v-if="!currentRecordAnswer || currentRecordAnswer === 'no'">本题你未选择答案</p>
          <p class="tips" v-if="!currentOpponentRecordAnswer || currentOpponentRecordAnswer === 'no'">本题对手未选择答案</p>
          <div class="answers">
            <div v-for="option in currentRecordOptions" class="answer-option md-elevation-1" :class="{
              'correct': option.name === currentRecordQuestionAnswer,
              'error': currentRecordAnswer === option.name || currentOpponentRecordAnswer === option.name,
            }">{{option.name}}: {{option.value}}
              <template v-if="currentRecordAnswer === option.name">
                <icon v-if="option.name === currentRecordQuestionAnswer" name="check-circle" class="select my-select" scale="1"></icon>
                <icon v-else name="times-circle" class="select my-select" scale="1"></icon>
              </template>
              <template v-if="currentOpponentRecordAnswer === option.name">
                <icon v-if="option.name === currentRecordQuestionAnswer" name="check-circle" class="select opponent-select" scale="1"></icon>
                <icon v-else name="times-circle" class="select opponent-select" scale="1"></icon>
              </template>
            </div>
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
    <md-dialog :md-active.sync="quiting" :md-fullscreen="false">
      <md-dialog-title>确定要直接返回放弃比赛吗？</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-accent" @click="goBack()">放弃比赛</md-button>
        <md-button class="md-primary" @click="quiting = false">继续比赛</md-button>
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
    },
    currentOpponentRecordAnswer () {
      if (this.opponent && this.opponent.answers && this.questions && this.questions[this.currentRecordIndex]) {
        const answer = this.opponent.answers.find(a => a.questionId === this.questions[this.currentRecordIndex].questionId);
        if (answer) {
          return answer.answer;
        }
      }
      return false;
    }
  },
  data: () => ({
    isDisabled: false,
    second: 10,
    me: null,
    opponent: null,
    roomId: '',
    chapterId: '',
    chapterName: '',
    waitMsg: '正在等待你的对手进入房间……',
    waiting: true,
    quiting: false,
    currentQuestion:  '',
    currentOptions: [],
    currentQuestionIndex: 0,
    currentMeAnswer: '',
    currentOpponentAnswer: '',
    myRightCount: 0,
    opponentRightCount: 0,
    opponentHeight: 0,
    myHeight: 0,
    opponentScore: 0,
    myScore: 0,
    questions: [],
    snackMsg: '',
    showSnackbar: false,
    result: false,
    resultMsg: '',
    uploading: false,
    time: 10,
    timeout: null,
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
    playRoom.on('opponentAnswer', ({ questionId, answer, currentScore }) => {
      this.opponent.answers = this.opponent.answers || [];
      this.opponent.answers.push({ questionId, answer });
      this.currentOpponentAnswer = answer;
      const questionIndex = this.questions.findIndex(v => v.questionId === questionId);
      if (questionIndex !== -1) {
        if (this.questions[questionIndex].answer === answer) {
          this.opponentRightCount++;
          this.opponentHeight += this.time / this.questions.length * 10;
          this.opponentScore += currentScore;
          this.showSnackBarMethod('你的对手答对了一题！');
        }
      }
      if (this.currentQuestionIndex < this.questions.length - 1) {
        if (this.currentMeAnswer) {
          if (this.timeout) window.clearTimeout(this.timeout);
          // 延时1秒再跳到下一题
          this.timeout = window.setTimeout(() => {
            this.currentQuestionIndex++;
            this.currentQuestion = this.questions[this.currentQuestionIndex].question;
            this.currentOptions = this.questions[this.currentQuestionIndex].options;
            this.currentMeAnswer = '';
            this.currentOpponentAnswer = '';
            this.isDisabled = false;
            this.startTimer();
          },1000)
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
      if (this.timer) window.clearInterval(this.timer);
      let isMeWin = 0;
      let isOpponentWin = 0;
      if (opponentQuit === true) {
        this.showQuitResult();
        // 落荒而逃给后台的判断标识
        /*
        this.me.answers.push({
          questionId: '0',
          answer: '1'
        });
        this.opponent.answers.push({
          questionId: '0',
          answer: '0'
        });
        */
        isMeWin = 1;
        isOpponentWin = 0;
      } else {
        if (this.myScore > this.opponentScore) {
          isMeWin = 1;
          isOpponentWin = 0;
        }
        else if (this.myScore > this.opponentScore) {
          isMeWin = 0;
          isOpponentWin = 0;
        }
        else {
          isMeWin = 0;
          isOpponentWin = 1;
        }
        this.showResult();
      }
      if (requestUserId === this.$store.state.user.uid) {
        this.uploading = true;
        this.$http.post('/brain/saveAnswers', {
          result : [{
            userId : this.me.uid,
            userScore: this.myScore,
            winner: isMeWin,
            answers : this.me.answers,
          },{
            userId : this.opponent.uid,
            userScore: this.opponentScore,
            winner: isOpponentWin,
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
  beforeRouteEnter (from, to, next) {
    if (!to.name) { // 刷新重定向
      next(vm => {
        vm.$router.go(-2);
      })
    }
    next();
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
    showQuiting () {
      if (!this.isOver) {
        this.quiting = true;
      } else {
        this.goBack();
      }
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
      if (this.myScore > this.opponentScore) {
        this.resultMsg = `恭喜你战胜了 @${this.opponent.userName}。`;
      } else if (this.myScore < this.opponentScore) {
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
      if (this.isDisabled) return; // 用户已选择答案后，防止再点击
      this.me.answers = this.me.answers || [];
      this.currentMeAnswer = option.name;
      this.isDisabled = true;
      const answer = { questionId: this.questions[this.currentQuestionIndex].questionId, answer: option.name };
      this.me.answers.push(answer);
      let currentScore = 0
      if (this.questions[this.currentQuestionIndex].answer === option.name) {
        this.myRightCount++;
        this.myHeight += this.time / this.questions.length * 10;
        currentScore = parseInt(20 * this.time);
        this.myScore += currentScore;
        this.showSnackBarMethod('你答对了~~');
      }
      answer.currentScore = currentScore;
      this.playRoom.emit('answer', answer);
      if (this.currentQuestionIndex < this.questions.length - 1) {
        if (this.currentOpponentAnswer) {
          if (this.timeout) window.clearTimeout(this.timeout);
          // 延时1秒再跳到下一题
          this.timeout = window.setTimeout(() => {
            this.currentQuestionIndex++;
            this.currentQuestion = this.questions[this.currentQuestionIndex].question;
            this.currentOptions = this.questions[this.currentQuestionIndex].options;
            this.currentMeAnswer = '';
            this.currentOpponentAnswer = '';
            this.isDisabled = false;
            this.startTimer();
          },1000)
        }
      } else {
        this.playRoom.emit('finish', {userId: this.$store.state.user.uid});
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
  }
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  $yellow-color: md-get-palette-color(yellow, A400);
  $my-color: rgb(250, 83, 129);
  $opponent-color: md-get-palette-color(blue, 300);

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

      .user-name {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 94px;
        box-sizing: border-box;
        padding: 0 3px;
      }

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
          margin: auto;
        }
      }

      .me {
        .avatar {
          background-color: $my-color;
          padding-left: 25px;
          border-bottom-right-radius: 50px;
          border-top-right-radius: 50px;
        }
      }

      .opponent {
        .avatar {
          background-color: $opponent-color;
          padding-right: 25px;
          border-bottom-left-radius: 50px;
          border-top-left-radius: 50px;
        }
      }
    }

    .counter {
      color: $yellow-color;
      font-size: 22px;
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

    .question {
      font-size: 16px;
      margin: 10px 0 25px;
      line-height: 25px;
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
        padding: 8px 24px;
        width: 70%;
        background-color: #fff;
        border-radius: 3px;
        color: rgba(0, 0, 0, 0.87);
        word-break: break-all;
        position: relative;

        .select {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;

          &.my-select {
            left: 5px;
          }

          &.opponent-select {
            right: -5px;
          }
        }

        &.error {
          background-color: rgb(255, 110, 96);
        }

        &.correct {
          background-color: rgb(0, 226, 188);
        }
      }
    }

    .uploading {
      padding: 8px;
    }
  }
</style>
