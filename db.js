// const { Client } = require('pg');

const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('terra.pelledb', 'postgres', 'serve', {
  host: 'localhost',
  dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
    timestamps: false
}
  // port: 5432,
  // ssl: { rejectUnauthorized: false },
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
})

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
 
dbConnect();

// const client = new Client(
//   {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'terra.pelledb',
//     password: 'serve',
//     port: 5432,
//     ssl: { rejectUnauthorized: false },
//   },
// );

// client.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connection established');
// });

module.exports = sequelize;
