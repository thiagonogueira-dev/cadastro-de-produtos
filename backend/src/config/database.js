module.exports = {
    dialect: 'postgres',
    timezone: 'America/Sao_Paulo',
    host: 'ep-withered-feather-76078245-pooler.us-east-1.postgres.vercel-storage.com',
    username: 'default',
    password: 'nCRJT24htdQr',
    database: 'products-crud',
    define: {
        timestamp: true,
        underscored: true
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}