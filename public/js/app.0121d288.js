(function(t){function e(e){for(var s,o,r=e[0],c=e[1],d=e[2],l=0,m=[];l<r.length;l++)o=r[l],a[o]&&m.push(a[o][0]),a[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(m.length)m.shift()();return i.push.apply(i,d||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],s=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(s=!1)}s&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var s={},a={1:0},i=[];function o(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=s,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var d=0;d<r.length;d++)e(r[d]);var u=c;i.push([14,0]),n()})({14:function(t,e,n){t.exports=n("Vtdi")},"3cow":function(t,e,n){"use strict";var s=n("7jGf"),a=n.n(s);a.a},5:function(t,e){},"7jGf":function(t,e,n){},"7x0a":function(t,e,n){},A591:function(t,e,n){"use strict";var s=n("gUDS"),a=n.n(s);a.a},BCXF:function(t,e,n){},BcgU:function(t,e,n){"use strict";var s=n("nxxt"),a=n.n(s);a.a},VKyA:function(t,e,n){"use strict";var s=n("7x0a"),a=n.n(s);a.a},Vtdi:function(t,e,n){"use strict";n.r(e);n("VRzm");var s=n("Kw5r"),a=n("Q/mQ"),i=n.n(a),o=(n("Ud79"),n("4JRs"),n("0G0I"),n("CHRH")),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"md-layout md-alignment-center-center",attrs:{id:"app"}},[n("router-view",{staticClass:"md-layout-item md-small-size-100 md-size-50"})],1)},c=[],d=(n("nNx0"),n("KHd+")),u={},l=Object(d["a"])(u,r,c,!1,null,null,null),m=l.exports,h=n("jE9Z"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[t._m(0),t._v(" "),n("person-card"),t._v(" "),n("md-button",{staticClass:"md-raised md-primary link",attrs:{to:"/topic-chosen"}},[t._v("双人对战")]),t._v(" "),n("md-button",{staticClass:"md-raised md-primary link",attrs:{to:"/record"}},[t._v("战绩")]),t._v(" "),n("md-button",{staticClass:"md-raised md-primary link",attrs:{to:"/ranking"}},[t._v("排名")])],1)},v=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"md-layout"},[n("div",[t._v("通信工知识竞技对战平台")])])}],f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("md-card",{staticClass:"md-primary"},[s("md-card-content",[s("md-avatar",{staticClass:"md-large"},[s("img",{attrs:{src:n("zwU1"),alt:"Avatar"}})]),t._v(" "),s("div",{staticClass:"name"},[t._v(t._s(t.user.nickname))])],1),t._v(" "),s("md-card-actions",[s("md-button",{attrs:{to:"/personal"}},[t._v("修改资料")]),t._v(" "),s("md-button",{staticClass:"md-accent md-raised",on:{click:function(e){t.logout()}}},[t._v("退出登录")])],1)],1)},_=[],g=(n("pIFo"),n("L2JU")),k={name:"person-card",computed:Object(g["b"])({user:function(t){return t.user}}),data:function(){return{amount:50}},methods:{logout:function(){this.$store.commit("setUser",null),this.$router.replace("/login")}}},w=k,b=(n("VKyA"),Object(d["a"])(w,f,_,!1,null,"665ba4d8",null)),C=b.exports,y={components:{PersonCard:C},name:"home"},I=y,R=(n("sRU6"),Object(d["a"])(I,p,v,!1,null,"3bd341f2",null)),x=R.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-card",[n("md-card-header",[n("div",{staticClass:"md-title"},[t._v("登录")])]),t._v(" "),n("md-card-content",[n("div",{staticClass:"md-layout md-size-75 md-alignment-center"},[n("md-field",{staticClass:"md-layout-item md-size-75"},[n("label",[t._v("昵称")]),t._v(" "),n("md-input",{model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}})],1),t._v(" "),n("md-field",{staticClass:"md-layout-item md-size-75"},[n("label",[t._v("密码")]),t._v(" "),n("md-input",{attrs:{type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),n("md-button",{staticClass:"md-raised md-primary md-layout-item md-size-75",attrs:{disabled:!t.nickname||!t.password},on:{click:function(e){t.login()}}},[t._v("登录")]),t._v(" "),n("md-button",{staticClass:"md-flat md-primary md-layout-item md-size-75",attrs:{to:"/register"}},[t._v("尚未注册？")])],1)]),t._v(" "),n("md-snackbar",{attrs:{"md-position":"left","md-duration":2e3,"md-active":t.showSnack,"md-persistent":""},on:{"update:mdActive":function(e){t.showSnack=e}}},[n("span",[t._v(t._s(t.msg))])])],1)},S=[],M={name:"login",data:function(){return{nickname:"",password:"",msg:"",showSnack:!1}},methods:{login:function(){var t=this;this.$http.post("/user/login",{nickname:this.nickname,password:this.password}).then(function(e){t.$store.commit("setUser",e),t.$router.replace("/")}).catch(function(e){t.msg=e.msg,t.showSnack=!0})}}},q=M,Q=(n("f0tb"),Object(d["a"])(q,$,S,!1,null,"449c56d9",null)),j=Q.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-card",[n("md-card-header",[n("div",{staticClass:"md-title"},[t._v("注册")])]),t._v(" "),n("md-card-content",[n("div",{staticClass:"md-layout md-size-75 md-alignment-center"},[n("md-field",{staticClass:"md-layout-item md-size-75"},[n("label",[t._v("昵称")]),t._v(" "),n("md-input",{model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}})],1),t._v(" "),n("md-field",{staticClass:"md-layout-item md-size-75"},[n("label",[t._v("密码")]),t._v(" "),n("md-input",{attrs:{type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),n("md-button",{staticClass:"md-raised md-primary md-layout-item md-size-75",attrs:{disabled:!t.nickname||!t.password},on:{click:function(e){t.register()}}},[t._v("注册")]),t._v(" "),n("md-button",{staticClass:"md-flat md-primary md-layout-item md-size-75",attrs:{to:"/login"}},[t._v("已有账号？")])],1)]),t._v(" "),n("md-snackbar",{attrs:{"md-position":"left","md-duration":2e3,"md-active":t.showSnack,"md-persistent":""},on:{"update:mdActive":function(e){t.showSnack=e}}},[n("span",[t._v("注册成功，即将跳转至登录页面…")])])],1)},A=[],B={name:"register",data:function(){return{nickname:"",password:"",showSnack:!1}},methods:{register:function(){var t=this;this.$http.post("/user/save",{nickname:this.nickname,password:this.password}).then(function(e){t.showSnack=!0,window.setTimeout(function(){t.$router.push("/login")},2e3)})}}},O=B,N=(n("uAmO"),Object(d["a"])(O,z,A,!1,null,"3ce09538",null)),U=N.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"topic-chosen"},[n("div",{staticClass:"header md-layout md-alignment-center-left",on:{click:function(e){t.goBack()}}},[n("icon",{attrs:{name:"angle-left",scale:"2"}}),t._v(" "),n("span",{staticClass:"text"},[t._v("双人对战")])],1),t._v(" "),n("person-card"),t._v(" "),n("md-list",{staticClass:"md-elevation-2"},t._l(t.courses,function(e){return n("md-list-item",{key:e.courseId,attrs:{"md-expand":""}},[n("span",{staticClass:"md-list-item-text"},[t._v(t._s(e.course))]),t._v(" "),n("md-list",{attrs:{slot:"md-expand"},slot:"md-expand"},t._l(e.chapters,function(e){return n("md-list-item",{key:e.chapterId,staticClass:"md-inset",on:{click:function(n){t.startBattle(e.chapterId,e.chapter)}}},[t._v(t._s(e.chapter))])}))],1)})),t._v(" "),n("md-dialog",{attrs:{"md-active":t.showMatching},on:{"update:mdActive":function(e){t.showMatching=e}}},[n("md-dialog-title",[t._v("正在寻找与你实力相当的对手……")]),t._v(" "),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:function(e){t.cancelMatch()}}},[t._v("退出匹配")])],1)],1)],1)},E=[],T=(n("INYr"),n("gFX4")),F=n.n(T),G={components:{PersonCard:C},name:"topic-chosen",mounted:function(){var t=this;this.$http.post("/question/getCourseAndChapter").then(function(e){t.courses=e.filter(function(t){return t.chapters.length})}),this.matchRoom=F()("http://125.216.112.121:8001/match"),this.matchRoom.on("success",function(e){console.log(e),-1!==e.userIds.map(function(t){return parseInt(t)}).findIndex(function(e){return e===t.$store.state.user.uid})&&(t.matchRoom.disconnect(),t.$router.push({path:"battle",query:{roomId:e.roomId,chapterId:t.matchingId,chapterName:t.matchingName}}))})},methods:{startBattle:function(t,e){this.matchingId||(this.matchRoom.open(),this.matchRoom.emit("start",{userId:this.$store.state.user.uid,chapterId:t}),this.matchingId=t,this.matchingName=e,this.showMatching=!0)},cancelMatch:function(){this.matchRoom.disconnect(),this.matchRoom.emit("cancel",{userId:this.$store.state.user.uid,chapterId:this.matchingId}),this.matchingId="",this.matchingName="",this.showMatching=!1},goBack:function(){this.$router.back()}},data:function(){return{amount:50,courses:[],showDialog:!1,showMatching:!1,matchingId:"",matchingName:""}}},D=G,V=(n("gZ37"),Object(d["a"])(D,P,E,!1,null,"a74ceeac",null)),Y=V.exports,Z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"header md-layout md-alignment-center-left",on:{click:function(e){t.goBack()}}},[s("icon",{attrs:{name:"angle-left",scale:"2"}}),t._v(" "),s("span",{staticClass:"text"},[t._v("对战")])],1),t._v(" "),s("div",{staticClass:"battle md-elevation-2"},[s("div",{staticClass:"battle-header"},[t.me?s("div",{staticClass:"me"},[s("div",{staticClass:"avatar"},[s("md-avatar",{staticClass:"md-large"},[s("img",{attrs:{src:n("zwU1"),alt:"Avatar"}})])],1),t._v(" "),s("span",[t._v(t._s(t.me.userName))])]):t._e(),t._v(" "),s("div",{staticClass:"timer"},[s("div",{staticClass:"seconds"},[t._v("10S")]),t._v(" "),s("div",{staticClass:"chapter"},[t._v(t._s(t.chapterName))])]),t._v(" "),t.opponent?s("div",{staticClass:"opponent"},[s("div",{staticClass:"avatar"},[s("md-avatar",{staticClass:"md-large"},[s("img",{attrs:{src:n("zwU1"),alt:"Avatar"}})])],1),t._v(" "),s("span",[t._v(t._s(t.opponent.userName))])]):t._e()]),t._v(" "),s("div",{staticClass:"md-layout"},[s("div",{staticClass:"counter"},[s("div",{staticClass:"bar"},[s("div",{staticClass:"fill",style:{height:20*t.myRightCount+"%"}})]),t._v(" "),s("div",[t._v(t._s(t.myRightCount)+"/5")])]),t._v(" "),s("div",{staticClass:"md-layout-item"},[t.currentQuestion?[s("p",{staticClass:"question"},[t._v(t._s(t.currentQuestion.question))]),t._v(" "),s("div",{staticClass:"answers"},t._l(t.currentQuestion.options,function(e){return s("md-button",{staticClass:"md-raised",on:{click:function(n){t.select(e)}}},[t._v(t._s(e.name)+": "+t._s(e.value))])}))]:t._e()],2),t._v(" "),s("div",{staticClass:"counter"},[s("div",{staticClass:"bar"},[s("div",{staticClass:"fill",style:{height:20*t.opponentRightCount+"%"}})]),t._v(" "),s("div",[t._v(t._s(t.opponentRightCount)+"/5")])])])]),t._v(" "),s("md-snackbar",{attrs:{"md-position":"left","md-duration":1e3,"md-active":t.showSnackbar,"md-persistent":""},on:{"update:mdActive":function(e){t.showSnackbar=e}}},[s("span",[t._v(t._s(t.snackMsg))]),t._v(" "),s("md-button",{staticClass:"md-primary",on:{click:function(e){t.showSnackbar=!1}}},[t._v("Retry")])],1),t._v(" "),s("md-dialog",{attrs:{"md-active":t.waiting},on:{"update:mdActive":function(e){t.waiting=e}}},[s("md-dialog-title",[t._v(t._s(t.waitMsg))]),t._v(" "),s("md-dialog-actions",[s("md-button",{staticClass:"md-primary",on:{click:function(e){t.goBack()}}},[t._v("放弃比赛")])],1)],1),t._v(" "),s("md-dialog",{attrs:{"md-active":t.result},on:{"update:mdActive":function(e){t.result=e}}},[s("md-dialog-title",[t._v(t._s(t.resultMsg))]),t._v(" "),t.uploading?s("p",[t._v("结果上传中……")]):t._e(),t._v(" "),s("md-dialog-actions",[s("md-button",{staticClass:"md-primary",attrs:{disabled:t.uploading},on:{click:function(e){t.goBack()}}},[t._v("返回")])],1)],1)],1)},J=[],K=(n("f3/d"),{name:"battle",data:function(){return{second:10,me:null,opponent:null,roomId:"",chapterId:"",chapterName:"",waitMsg:"正在等待你的对手进入房间……",waiting:!0,questions:[],currentQuestion:null,currentQuestionIndex:0,myRightCount:0,opponentRightCount:0,snackMsg:"",showSnackbar:!1,result:!1,resultMsg:"",uploading:!1}},mounted:function(){var t=this,e=this.$router.currentRoute.query;this.roomId=e.roomId,this.chapterId=e.chapterId,this.chapterName=e.chapterName;var n=F()("http://125.216.112.121:8001/room/".concat(this.roomId));n.emit("ready",{userId:this.$store.state.user.uid,chapterId:this.chapterId}),n.on("begin",function(e){var n=e.playerOne,s=e.playerTwo,a=e.questions;console.log("begin play"),console.log(a),parseInt(n.uid)===t.$store.state.user.uid?(t.me=n,t.opponent=s):(t.me=s,t.opponent=n),t.questions=a,t.currentQuestion=a[t.currentQuestionIndex],t.waiting=!1}),n.on("opponentAnswer",function(e){var n=e.questionId,s=e.answer;t.opponent.answers=t.opponent.answers||[],t.opponent.answers.push({questionId:n,answer:s});var a=t.questions.findIndex(function(t){return t.questionId===n});-1!==a&&t.questions[a].answer===s&&(t.opponentRightCount++,t.showSnackBarMethod("你的对手答对了一题！"))}),n.on("over",function(e){var s=e.opponentQuit,a=e.requestUserId;!0===s&&t.showQuitResult(),a===t.$store.state.user.uid&&(t.uploading=!0,t.$http.post("/brain/saveAnswers",{result:[{userId:t.me.uid,answers:t.me.answers},{userId:t.opponent.uid,answers:t.opponent.answers}]}).then(function(e){t.uploading=!1})),n.disconnect(!0)}),this.playRoom=n},methods:{goBack:function(){this.playRoom.emit("quit",{userId:this.$store.state.user.uid,chapterId:this.chapterId}),this.$router.back()},showSnackBarMethod:function(t){this.snackMsg=t,this.showSnackbar=!0},showWaitingMethod:function(t){this.waitMsg=t,this.waiting=!0},showResult:function(){this.myRightCount>this.opponentRightCount?this.resultMsg="恭喜你战胜了 @".concat(this.opponent.userName,"。"):this.myRightCount<this.opponentRightCount?this.resultMsg="很遗憾你被 @".concat(this.opponent.userName," 打败了"):this.resultMsg="你跟 @".concat(this.opponent.userName," 握手言和"),this.result=!0},showQuitResult:function(){this.resultMsg="@".concat(this.opponent.userName," 落荒而逃，你赢得了比赛。"),this.result=!0},select:function(t){this.me.answers=this.me.answers||[];var e={questionId:this.currentQuestion.questionId,answer:t.name};this.me.answers.push(e),this.playRoom.emit("answer",e),this.currentQuestion.answer===t.name&&(this.myRightCount++,this.showSnackBarMethod("你答对了~~")),this.currentQuestionIndex++,this.currentQuestionIndex<5?this.currentQuestion=this.questions[this.currentQuestionIndex]:(this.playRoom.emit("finish",{userId:this.$store.state.user.uid}),this.showResult())}}}),L=K,H=(n("pGAI"),Object(d["a"])(L,Z,J,!1,null,"8bea81d6",null)),W=H.exports,X=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"record"},[n("div",{staticClass:"header md-layout md-alignment-center-left",on:{click:function(e){t.goBack()}}},[n("icon",{attrs:{name:"angle-left",scale:"2"}}),t._v(" "),n("span",{staticClass:"text"},[t._v("战绩")])],1),t._v(" "),n("person-card"),t._v(" "),n("md-card",[n("md-content",{staticClass:"record-stats md-layout md-alignment-center-space-around"},[n("div",{staticClass:"stat"},[n("div",{staticClass:"data"},[t._v(t._s(t.totalQuesstion))]),t._v(" "),n("div",{staticClass:"title"},[t._v("答题")])]),t._v(" "),n("div",{staticClass:"stat"},[n("div",{staticClass:"data"},[t._v(t._s(t.totalSession))]),t._v(" "),n("div",{staticClass:"title"},[t._v("总场次")])])]),t._v(" "),n("md-divider"),t._v(" "),n("md-table",[n("md-table-row",[n("md-table-head",{attrs:{"md-numeric":""}},[t._v("作答时间")]),t._v(" "),n("md-table-head",[t._v("题目名称")]),t._v(" "),n("md-table-head",[t._v("做过的次数")])],1),t._v(" "),t._l(t.questionRecord,function(e){return n("md-table-row",[n("md-table-head",{attrs:{"md-numeric":""}},[t._v(t._s(e.answertime))]),t._v(" "),n("md-table-head",[t._v(t._s(e.question))]),t._v(" "),n("md-table-head",[t._v(t._s(e.count))])],1)})],2)],1)],1)},tt=[],et={components:{PersonCard:C},name:"record",data:function(){return{questionRecord:[],totalQuesstion:"0",totalSession:"0"}},mounted:function(){var t=this;this.$http.post("/user/getUserGains",{uid:this.$store.state.user.uid}).then(function(e){t.questionRecord=e.questionRecord,t.totalQuesstion=e.totalQuesstion,t.totalSession=e.totalSession})},methods:{goBack:function(){this.$router.back()}}},nt=et,st=(n("3cow"),Object(d["a"])(nt,X,tt,!1,null,"c3950052",null)),at=st.exports,it=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"personal"},[s("div",{staticClass:"header md-layout md-alignment-center-left",on:{click:function(e){t.goBack()}}},[s("icon",{attrs:{name:"angle-left",scale:"2"}}),t._v(" "),s("span",{staticClass:"text"},[t._v("修改资料")])],1),t._v(" "),s("md-card",[s("md-card-content",[s("md-avatar",{staticClass:"md-large"},[s("img",{attrs:{src:n("zwU1"),alt:"Avatar"}})]),t._v(" "),s("div",{staticClass:"md-layout md-size-75 md-alignment-center"},[s("md-field",{staticClass:"md-layout-item md-size-75"},[s("label",[t._v("姓名")]),t._v(" "),s("md-input",{model:{value:t.nickname,callback:function(e){t.nickname=e},expression:"nickname"}})],1),t._v(" "),s("md-field",{staticClass:"md-layout-item md-size-75"},[s("label",[t._v("新密码")]),t._v(" "),s("md-input",{attrs:{type:"password"},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}})],1),t._v(" "),s("md-button",{staticClass:"md-raised md-primary md-layout-item md-size-75",attrs:{disabled:!t.newPassword},on:{click:function(e){t.update()}}},[t._v("确认更改")])],1)],1),t._v(" "),s("md-snackbar",{attrs:{"md-position":"left","md-duration":2e3,"md-active":t.showSnack,"md-persistent":""},on:{"update:mdActive":function(e){t.showSnack=e}}},[s("span",[t._v(t._s(t.msg))])])],1)],1)},ot=[],rt={name:"personal",data:function(){return{newPassword:"",msg:"",showSnack:!1}},computed:{nickname:{get:function(){return this.$store.state.user.nickname},set:function(t){this.$store.commit("updateNickname",t)}}},methods:{update:function(){var t=this;this.newPassword&&this.$http.post("/user/update",{uid:this.$store.state.user.uid,nickname:this.nickname,newPassword:this.newPassword}).then(function(){t.msg="修改成功",t.showSnack=!0}).catch(function(e){t.msg=e.msg,t.showSnack=!0})},goBack:function(){this.$router.back()}}},ct=rt,dt=(n("A591"),Object(d["a"])(ct,it,ot,!1,null,"f9252776",null)),ut=dt.exports,lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ranking"},[n("div",{staticClass:"header md-layout md-alignment-center-left",on:{click:function(e){t.goBack()}}},[n("icon",{attrs:{name:"angle-left",scale:"2"}}),t._v(" "),n("span",{staticClass:"text"},[t._v("排名")])],1),t._v(" "),n("person-card"),t._v(" "),n("md-card",[n("md-table",[t.myRanking?n("md-table-row",[n("md-table-head",{attrs:{"md-numeric":""}},[t._v(t._s(t.myRanking.rank))]),t._v(" "),n("md-table-head",[t._v(t._s(t.myRanking.nickname))]),t._v(" "),n("md-table-head",[t._v("答题数："+t._s(t.myRanking.totalQuesstion))])],1):t._e(),t._v(" "),t._l(t.theirRanking,function(e){return n("md-table-row",[n("md-table-head",{attrs:{"md-numeric":""}},[t._v(t._s(e.rank))]),t._v(" "),n("md-table-head",[t._v(t._s(e.nickname))]),t._v(" "),n("md-table-head",[t._v("答题数："+t._s(e.totalQuesstion))])],1)})],2)],1)],1)},mt=[],ht={components:{PersonCard:C},name:"ranking",data:function(){return{myRanking:null,theirRanking:[]}},mounted:function(){var t=this;this.$http.post("/user/getRank",{uid:this.$store.state.user.uid}).then(function(e){t.myRanking=e.user,t.theirRanking=e.users})},methods:{goBack:function(){this.$router.back()}}},pt=ht,vt=(n("BcgU"),Object(d["a"])(pt,lt,mt,!1,null,"3a2506af",null)),ft=vt.exports;s["default"].use(h["a"]);var _t=new h["a"]({routes:[{path:"/",name:"home",component:x},{path:"/login",name:"login",component:j},{path:"/register",name:"register",component:U},{path:"/personal",name:"personal",component:ut},{path:"/topic-chosen",name:"topic-chosen",component:Y},{path:"/battle",name:"battle",component:W},{path:"/record",name:"record",component:at},{path:"/ranking",name:"ranking",component:ft}]}),gt=n("DkTT");s["default"].use(g["a"]);var kt=new g["a"].Store({state:{user:null},mutations:{setUser:function(t,e){t.user=e},updateNickname:function(t,e){t.user&&(t.user.nickname=e)}},actions:{},plugins:[Object(gt["a"])()]}),wt=n("vDqi"),bt=n.n(wt);bt.a.defaults.baseURL="http://125.216.112.121:8083",bt.a.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8",bt.a.interceptors.response.use(function(t){return t},function(t){return console.log(t),Promise.reject(t)});var Ct=function(t){console.log(t);var e=t.data,n=e.data,s=e.status;return 200!==s?Promise.reject(t.data):Promise.resolve(n)};s["default"].prototype.$http={get:function(t,e){return bt.a.get(t,{params:e}).then(Ct)},post:function(t,e){return bt.a.post(t,e).then(Ct)},put:function(t,e){return bt.a.put(t,e).then(Ct)},del:function(t,e){return bt.a.delete(t,{params:e}).then(Ct)}};s["default"].config.productionTip=!1,s["default"].use(i.a),s["default"].component("icon",o["a"]),new s["default"]({router:_t,store:kt,render:function(t){return t(m)}}).$mount("#app")},dTLk:function(t,e,n){},f0tb:function(t,e,n){"use strict";var s=n("ysYZ"),a=n.n(s);a.a},fnoW:function(t,e,n){},gUDS:function(t,e,n){},gZ37:function(t,e,n){"use strict";var s=n("BCXF"),a=n.n(s);a.a},koar:function(t,e,n){},nNx0:function(t,e,n){"use strict";var s=n("fnoW"),a=n.n(s);a.a},nxxt:function(t,e,n){},pGAI:function(t,e,n){"use strict";var s=n("koar"),a=n.n(s);a.a},sRU6:function(t,e,n){"use strict";var s=n("yFhY"),a=n.n(s);a.a},uAmO:function(t,e,n){"use strict";var s=n("dTLk"),a=n.n(s);a.a},yFhY:function(t,e,n){},ysYZ:function(t,e,n){},zwU1:function(t,e,n){t.exports=n.p+"img/logo.0a52e065.png"}});
//# sourceMappingURL=app.0121d288.js.map