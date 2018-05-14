## namespace及其对应事件

### 通用事件 /

1. 前端向后端通知的事件

| 事件名称 | 说明     | 传递数据 |
| -------- | -------- | -------- |
| online   | 用户上线 | {userId} |
| off      | 用户下线 | {userId} |

2. 后端向前端通知的事件

| 事件名称 | 说明         | 传递数据                     |
| -------- | ------------ | ---------------------------- |
| fight    | 通知用户对战 | {userIds, chapterId, roomId} |



#### 匹配事件  /match

1. 前端向后端通知的事件

| 事件名称 | 说明         | 传递数据            |
| -------- | ------------ | ------------------- |
| start    | 用户发起匹配 | {userId, chapterId} |
| cancel   | 用户取消匹配 | {userId, chapterId} |

2. 后端向前端通知的事件

| 事件名称 | 说明         | 传递数据                     |
| -------- | ------------ | ---------------------------- |
| success  | 用户匹配成功 | {userIds, chapterId, roomId} |

#### 房间事件  /room/:roomId

1. 前端向后台通知的事件

| 事件名称 | 说明             | 传递数据             |
| -------- | ---------------- | -------------------- |
| ready    | 用户加载完成     | {userId, chapterId}  |
| answer   | 用户回答问题     | {questionId, answer} |
| finish   | 用户完成所有题目 | {userId}             |
| quit     | 用户退出房间     | {userId, chapterId}  |

2. 后端向前端通知的事件
| 事件名称       | 说明     | 传递数据                                                     |
| -------------- | -------- | ------------------------------------------------------------ |
| begin          | 开始对战 | {playerOne, playerTwo, questions}                            |
| opponentAnswer | 对手答题 | {questionId, answer}                                         |
| over           | 对战结束 | {opponentQuit(boolean), requestUserId(由谁发起答题结果提交)} |



## 前后端通信流程

>  双方答对的题数，对战结果由前端判断

### 一、自行匹配

1. 用户进入首页`emit('online', {userId})`，关闭网页则`emit('off', {userId})`

2. 用户A选择章节后点击匹配按钮  `connect('localhost:8001/match')`，之后 `emit('start', {userId, chapterId})`

3. node端接收`start`事件后在对应章节的匹配队列中匹配用户，若当前队列没有用户，将其用户A添加在队列中（用户A处于匹配中状态），若队列中存在用户B，取出用户B，并广播`success`事件：`emit('success', { userIds, chapterId, roomId })`，前端需要判断自己的id是否处于`userIds`数组中确认是否是自己匹配成功

4. 匹配过程中若用户A`emit('cancel', {userId, chapterId})`, 将用户A移出匹配队列

5. 用户A和用户B在接收到 `success` 事件后断开 match 连接，连接对应房间`connect('localhost:8001/room/:roomId')` ，加载题目后向后端 `emit('ready', {userId, chapterId})`

6. 后端在确认用户A，B都进入房间后 `emit('begin', {playerOne, playerTwo, questions})`, 此时用户A、B可以开始答题

7. 每次答题向后端发起 `emit('answer', {questionId, answer})`，后端向对手 `broadcast.emit('opponentAnswer', {questionId, answer})`，前端判断对方是否答对并更新对手的答对题数

8. 当一方完成所有答题时，向后端 `emit('finish', {userId})`，双方都完成答题后，后端`emit(over, {opponentQuit: false, requestUserId})`通知对战结束，前端根据双方答对题数显示对战结果，requestUserId的用户请求接口上传本次对战数据

9. 若中途一方退出房间 `emit('quit', {userId, chapterId})`, 视为对方胜利, 后端向对战方 `emit('over', {opponentQuit: true, requestUserId})`, 对战方上传本次对战数据



### 二、后台指定

1. java后台请求node后台fight接口，参数：`{userIds, chapterId}`，node后台判断userIds中的用户是否是 `online`状态，是的话调用成功，创建房间 `roomId` ，并 `emit('fight', {userIds, chapterId, roomId})`，有用户不在线的话调用失败。
2. 前端接收到 `fight` 事件后判断自己是否在 `userIds` 中，后面的步骤和第一种情况的步骤5开始一样

