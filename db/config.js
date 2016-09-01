module.exports = {
  HOST: process.env.RDB_HOST || "localhost",
  PORT: process.env.RDB_PORT || 28015,
  DB: "LEAGUE",
  USERS: "USERS",
  PROFILES: "PROFILES",
  PREFERENCES: "PREFERENCES",
  MATCHES: "MATCHES"
}