module.exports = {
    up: (db, Sequelize) => db.createTable('tb_topic', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING, unique: true }
    }, {
        timestamps: false
    }),
    down: db => db.dropTable('tb_topic')
}
