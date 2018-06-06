<template>
  <div class="mode-chosen">
    <div class="header md-layout md-alignment-center-left">
    </div>
    <person-card></person-card>
    <img id="test" src="../assets/test_bg.png" class="md-raised md-primary link" @click="test()" />
    <img id="fight" src="../assets/fight_bg.png" class="md-raised md-primary link" @click="fight()" />
  </div>
</template>
<script>
import PersonCard from '@/components/PersonCard.vue';
export default {
  name: 'mode-chosen',
  components: {
      PersonCard
  },
  methods: {
    fight () {
    	this.$router.push({path: '/topic-chosen'})
    },
    test () {
      if (this.isMobile()) {
        window.location.href = 'http://web2.gtxy.cn:8080/jjgg/';
        return;
      }
      window.location.href = 'http://125.216.112.121:81/PCW/index.php/Home/Signin/signin.html';
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
  },
  beforeRouteEnter (from, to, next) {
    document.title = '通信工成长记';
    next();
  },
  beforeRouteLeave (from, to, next) {
    document.title = '通信工知识竞技对战平台';
    next();
  }
};
</script>
<style lang="scss" scoped>
.mode-chosen {
    height: 100%;
}

.header {
	padding: 50px 8px 0;
	color: white;
	.text {
	    margin-left: 10px;
	}
}

.md-button {
    margin: 6px 8px;
}

.link {
  width: calc(100% - 16px);
  margin: 5px 1%;
  border-radius: 14px;
  font-size: 18px;
}

#test, #fight {
  width: 47%;
}

</style>
