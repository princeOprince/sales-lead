import { Sequelize, Model, DataTypes } from "sequelize";
import jsyaml from "js-yaml";
import { promises as fs } from "fs";
import debug from "debug";
const log = debug("sales-lead:model-lead");
const error = debug("sales-lead:model-error");


let sequelize;
export class Lead extends Model { }

export async function connectDB() {
  if (sequelize) return;

  const yamltext =
    await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');
  const params = jsyaml.load(yamltext, 'utf8');

  if (process.env.SEQUELIZE_DBNAME) {
    params.dbname = process.env.SEQUELIZE_DBNAME;
  }

  if (process.env.SEQUELIZE_DBUSER) {
    params.username = process.env.SEQUELIZE_DBUSER;
  }

  if (process.env.SEQUELIZE_DBPASSWD) {
    params.password = process.env.SEQUELIZE_DBPASSWD;
  }

  if (process.env.SEQUELIZE_DBHOST) {
    params.params.host = process.env.SEQUELIZE_DBHOST;
  }

  if (process.env.SEQUELIZE_DBPORT) {
    params.params.port = process.env.SEQUELIZE_DBPORT;
  }

  if (process.env.SEQUELIZE_DBDIALECT) {
    params.params.dialect = process.env.SEQUELIZE_DBDIALECT;
  }

  log(params);

  sequelize = new Sequelize(params.dbname,
    params.username,
    params.password,
    params.params);

  Lead.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Lead"
  });

  try {
    await sequelize.authenticate();
    log('Connection has been established successfully.');
  } catch (err) {
    error('Unable to connect to the database:', err);
    throw new Error(err);
  }

  await Lead.sync();
}

export async function close() {
  if (sequelize) sequelize.close();
  sequelize = undefined;
}
