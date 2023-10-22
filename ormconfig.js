module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pas123",
  database: "postgres",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
  clip: {
    migrationsDir: "src/migrations",
  },
};
