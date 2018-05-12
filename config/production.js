module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB,
    pass: process.env.REDIS_PASS
  },
  port: 8000
}
