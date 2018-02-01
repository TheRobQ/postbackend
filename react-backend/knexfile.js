module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/thepost'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
