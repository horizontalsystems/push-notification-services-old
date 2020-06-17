module.exports = {
    up: db => db.bulkInsert('tb_user', [{
        username: 'admin',
        password: 'secret' }]),
    down: db => db.bulkDelete('tb_user', null)
};
