const db = require('./bd')

const Usuario = db.sequelize.define("usuario",{
    nome: {
        type: db.Sequelize.STRING
    },
    idade: {
        type: db.Sequelize.INTEGER
    }
})

module.exports = Usuario