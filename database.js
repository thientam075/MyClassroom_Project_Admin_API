const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_URL,  {
    dialect: 'postgres',
    port: 5432,
    
    // dialectOptions: {ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //     }
    // },
    ssl: true,
    
});
try {
    db.authenticate().then(
        console.log('Connection has been established successfully.')
    );
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;