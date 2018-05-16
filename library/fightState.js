const prefix = {
  matchingUsers (chapterId) {
    return `matchingUsers-${chapterId}`
  },
  playingUsers () {
    return `playingUsers`
  },
  onlineUsers () {
    return 'onlineUsers'
  }
}

module.exports = {
  OnlineUser: {
    /**
     * 在线用户集
     */
    includes: async (userId) => {
      const result = await Cache.sismember(prefix.onlineUsers(), userId)
      return result
    },
    add: async (userIds) => {
      const result = await Cache.sadd(prefix.onlineUsers(), userIds)
      return result
    },
    remove: async (userIds) => {
      await Cache.srem(prefix.onlineUsers(), userIds)
    }
  },
  MatchingUser: {
    // 用户是否匹配中
    includes: async (chapterId, userId) => {
      const result = await Cache.sismember(prefix.matchingUsers(chapterId), userId)
      return result
    },
    // 添加用户到匹配队列
    add: async (chapterId, userIds) => {
      await Cache.sadd(prefix.matchingUsers(chapterId), userIds)
    },
    // 获取匹配中用户
    getOne: async (chapterId) => {
      const result = await Cache.spop(prefix.matchingUsers(chapterId))
      return result
    },
    // 删除匹配中用户
    remove: async (chapterId, userIds) => {
      await Cache.srem(prefix.matchingUsers(chapterId), userIds)
    }
  },
  PlayingUser: {
    /**
     * 对战中用户集
     */
    includes: async (userId) => {
      const result = await Cache.sismember(prefix.playingUsers(), userId)
      return result
    },
    add: async (userIds) => {
      await Cache.sadd(prefix.playingUsers(), userIds)
    },
    remove: async (userIds) => {
      await Cache.srem(prefix.playingUsers(), userIds)
    }
  }
}
