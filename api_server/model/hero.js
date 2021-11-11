import Sequelize from "sequelize"

const HeroModel = {
    name: "Hero",
    schema: {
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quality: {
            type: Sequelize.JSONB
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    },
    meta: {
        tableName: 'hero'
    }
}

export default HeroModel