import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../sequelizeConnection';

const sequelizeConn: SequelizeConnection = new SequelizeConnection()
const sequelize = sequelizeConn.sequelize;

class EmailNotificationModel extends Model {
    public id!: number;
    public to!: string;
    public subject!: string;
    public message!: string;
    public sent!: boolean;
}

EmailNotificationModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'EmailNotificationModel',
});

export default EmailNotificationModel;
