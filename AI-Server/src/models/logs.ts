import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from './index';

interface LogAttributes {
  id: string;
  tag: string;
  message: string;
  serviceName: string;
  priority: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LogInput = Optional<LogAttributes, 'id'>;
export type LogOutput = Required<LogAttributes>;

class Log extends Model<LogAttributes, LogInput> implements LogAttributes {
  public id!: string;
  public message!: string;
  public priority!: string;
  public serviceName!: string;
  public tag!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Log.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    tag: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: dbConnection,
    modelName: 'log',
    tableName: 'log',
    timestamps: true,
  },
);

export default Log;
