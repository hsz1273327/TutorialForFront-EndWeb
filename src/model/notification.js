import Sequelize from "sequelize"

const NotificationModel = {
    name: "Notification",
    schema: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        creater_id: {
            type: Sequelize.INTEGER,
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        notify_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        notify_target:{
            type: Sequelize.JSON,
            allowNull: false
        },
        message: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('Pendding', 'Canceled','Sent','Done','Error'),
            allowNull: false,
            defaultValue:'Pendding'
        },
        status_log: {
            type: Sequelize.JSON,
            allowNull: true
        }
    },
    meta: {
        tableName: 'notification'
    }
}

export default NotificationModel