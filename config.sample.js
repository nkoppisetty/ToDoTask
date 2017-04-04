module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  dirs: {
    uploads: `${__dirname}/uploads`,
    storage: `${__dirname}/storage`
  },

  orm: {
    db: {
      client: 'postgresql',
      connection: {
        database: 'tabelpress_dev',
        host: 'localhost',
        user: 'dev',
        password: 'dev'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: 'knex_migrations'
    },

    redis: {
      host: 'localhost',
      port: '6379',
      keyPrefix: 'tabelpress.api.'
    }
  },

  auth: {
    // 180 days in ms
    tokenLifetime: 365 * 24 * 3600 * 1000
  },

  headers: {
    authToken: 'auth-token'
  }
};
