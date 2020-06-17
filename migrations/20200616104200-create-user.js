module.exports = {
    up: (db, Sequelize) => db.createTable('tb_user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, unique: false },
        created: { type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') }
    }, {
        timestamps: false
    }),
    down: db => db.dropTable('tb_user')
}
