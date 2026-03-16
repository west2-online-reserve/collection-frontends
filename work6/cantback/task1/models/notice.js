// models/notice.js
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

const Notice = sequelize.define("Notice", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  dept: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(767),
    allowNull: false,
    unique: true,
  },
  viewCount: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    defaultValue: null,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  scrapedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: "notices",
  timestamps: false,
});

export { sequelize, Notice };
