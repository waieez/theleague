module.exports = {
  redisURL: process.env.REDIS_URL || "redis://localhost:6379",
  cookieSecret: process.env.COOKIE_SECRET || "SUPERSECRETCOOKIE"
}