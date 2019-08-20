const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',

    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelizeMeta.json',

    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: 'sequelize_meta',

    // Use a different schema for the SequelizeMeta table
    migrationStorageTableSchema: 'custom_schema',
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
    logging: false,
    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',

    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelizeMeta.json',

    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: 'sequelize_meta',

    // Use a different schema for the SequelizeMeta table
    migrationStorageTableSchema: 'custom_schema',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',

    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelizeMeta.json',

    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: 'sequelize_meta',

    // Use a different schema for the SequelizeMeta table
    migrationStorageTableSchema: 'custom_schema',
    dialectOptions: {
      ssl: true,
    },
  },
  preview: {
    dialect: 'postgres',
    url: process.env.REVIEW_DATABASE_URL,
    // Use a different storage type. Default: sequelize
    migrationStorage: 'json',

    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: 'sequelizeMeta.json',

    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: 'sequelize_meta',

    // Use a different schema for the SequelizeMeta table
    migrationStorageTableSchema: 'custom_schema',
    dialectOptions: {
      ssl: true,
    },
  },
}
