module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: { filename: './database/auth-testing.db3' },
    useNullAsDefault: true,
  },
};
