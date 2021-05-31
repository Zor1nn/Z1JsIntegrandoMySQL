const Sequelize = require('sequelize')

// Conexão com o banco de dados
const sequelize = new Sequelize("javascript", "root", "1231", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso")
}).catch(function(){
    console.log("Falha ao se conectar")
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}