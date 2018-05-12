/*
 * @Author: QuincyChen [chenquincy@qq.com] 
 * @Date: 2017-10-17 19:53:20 
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2017-10-17 22:38:12
 */

const Redis = require('ioredis')
const config = require('config').get('redis')

const client = new Redis(config.port, config.host, {
  password: config.pass,
  db: config.db
})

client.on('connect', function () {
  console.log('Cache connect success')
})

client.on('disconnect', function () {
  console.log('Cache disconnect')
})

client.on('error', function () {
  console.log('Cache error')
})

global.Cache = client
