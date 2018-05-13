<template>
  <div class="battle md-elevation-2">
    <div class="header">
      <div class="me">
        <div class="avatar">
          <md-avatar class="md-large">
            <img src="@/assets/avatar.png" alt="Avatar">
          </md-avatar>
        </div>
        <span>王媛媛</span>
      </div>
      <div class="timer">
        <div class="seconds">10S</div>
        <div class="chapter">基础知识</div>
      </div>
      <div class="opponent">
        <div class="avatar">
          <md-avatar class="md-large">
            <img src="@/assets/logo.png" alt="Avatar">
          </md-avatar>
        </div>
        <span>王媛媛</span>
      </div>
    </div>
    <div class="md-layout">
      <div class="counter">
        <div class="bar">
          <div class="fill"></div>
        </div>
        <div>1/5</div>
      </div>
      <div class="md-layout-item">
        <p class="question">同步数字体系具有什么帧结构？</p>
        <div class="answers">
          <md-button class="md-raised">块状</md-button>
          <md-button class="md-raised">块状</md-button>
          <md-button class="md-raised">块状</md-button>
          <md-button class="md-raised">块状</md-button>
        </div>
      </div>
      <div class="counter">
        <div class="bar">
          <div class="fill"></div>
        </div>
        <div>1/5</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'battle',
  data: () => ({
    second: 10,
  })
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  $yellow-color: md-get-palette-color(yellow, A400);

  .battle {
    width: 100%;
    height: 95vh;
    background-color: md-get-palette-color(blue, 500);
    border-radius: 10px;
    color: #fff;

    .header {
      margin: 20px 0;
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
