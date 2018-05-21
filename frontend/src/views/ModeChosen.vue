<template>
  <div class="mode-chosen">
    <div @click="goBack()" class="header md-layout md-alignment-center-left">
      <icon name="angle-left" scale="2"></icon>
      <span class="text">双人对战</span>
    </div>
    <md-button v-on:click="test()" class="md-raised md-primary md-layout-item md-size-75">测试</md-button>
    <md-button @click="fight()" class="md-raised md-primary md-layout-item md-size-75">对战</md-button>
  </div>
</template>
<script>
export default {
  name: 'mode-chosen',
  methods: {
    fight () {
    	this.$router.push({path: '/topic-chosen'})
    },
    test () {
      if (this.isMobile()) {
        window.location.href = 'http://lol.qq.com';
        return;
      }
      window.location.href = 'https://www.baidu.com';
    },
    goBack () {
      this.$router.back();
    },
    isMobile () { // 判断是否为移动端
     if(window.navigator.userAgent.match(/Android/i)
     || window.navigator.userAgent.match(/webOS/i)
     || window.navigator.userAgent.match(/iPhone/i)
     || window.navigator.userAgent.match(/iPad/i)
     || window.navigator.userAgent.match(/iPod/i)
     || window.navigator.userAgent.match(/BlackBerry/i)
     || window.navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mode-chosen {
    height: 100%;
}

.header {
	padding: 10px 8px 0;
	color: white;
	.text {
	    margin-left: 10px;
	}
}

.md-button {
    margin: 6px 8px;
}
</style>
