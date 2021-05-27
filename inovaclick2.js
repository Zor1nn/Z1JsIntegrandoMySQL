const readline =require('readline-sync')
const Sequelize = require('sequelize')
//const { UPDATE } = require('sequelize/types/lib/query-types')

var sair = 0
var opcao = 0
var BDname = readline.question("Insira o nome do banco de dados que deseja conectar:")
var login = readline.question("Insira o nome do usuario que deseja ser conectar:")
var senha = readline.question("Insira a senha:")
var hostlogin = readline.question("Insira o host a se conectar:")
const sequelize = new Sequelize(BDname, login, senha, {
    host: hostlogin,
    dialect: "mysql"
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
    main()
}).catch(function(){
    console.log("Falha ao se conectar!")
})

const Usuario = sequelize.define("usuario",{
    nome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    }
})

function main(){
    do{
        menu(opcao)

        if(opcao == 1){
            consultaTodos()
        }
        if(opcao == 2){
            consultaUsuario()
        }
        if(opcao == 3){
            inserir()
        }
        if(opcao == 4){
            atualiza()
        }
        if(opcao == 5){
            remover()
        }
        if(opcao == 6){
            sair = -1
            console.log("Saindo da aplicacao")
        }

    }while(sair == 0)
}

function consultaTodos(){   
    Usuario.findAll({
        attributes: ["id","nome","idade", "createdAt","updatedAt"]
    }).then(function(usuarios){
        console.log(usuarios)
    }).catch(function(){
        console.log("nao foi possivel realizar a consulta")
    })

}

function consultaUsuario(){
    var nome3 = readline.question("insira o nome do usuario consultado:")
       
    Usuario.findAll({where: {"nome" : nome3}}).then(function(usuarios){
        console.log(usuarios)
    }).catch(function(){
        console.log("nao foi possivel realizar a consulta")
    })
}

function inserir(){
    var nome1 = readline.question("Insira o nome do usuario a ser cadastrado:")
    var idade1 = readline.questionInt("Insira a idade:")

    Usuario.create({
        nome: nome1,
        idade: idade1
    }).then(function(){
        console.log("Usuario criado com sucesso!")
    }).catch(function(erro){
        console.log("Nao foi possivel cadastrar o usuario" + erro)
    })
}

function remover(){
    var id = readline.questionInt("Insira o id do usuario que deseje remover:")

    Usuario.destroy({where: {"id" : id}}).then(function(){
        console.log("Usuario removido com sucesso!")
    }).catch(function(){
        console.log("Usuario nao existe!")
    })    
}

function atualiza(){
    var id = readline.questionInt("insira o id do usuario que deseja atualizar:")
    var nome2 = readline.question("Insira o novo nome do usuario:")
    var idade2 = readline.questionInt("Insira a nova idade:")

    Usuario.findOne({where: {"id" : id}}, {
    }).then(function(usuario){
        usuario.nome = nome2
        usuario.idade = idade2

        usuario.save().then(function(){
            console.log("Usuario atualizado com sucesso")
        }).catch(function(){
            console.log("Falha ao cadastrar o usuario")
        })
        console.log("Usuario encontrado!")
    }).catch(function(){
        console.log("Usuario nao foi encontrado")
    })
}

function menu(){
    console.log("\n O que voce gostaria de fazer?")
    console.log("1.Consultar todos os usuários")
    console.log("2.Consultar um usuário especifico")
    console.log("3.Adicionar um novo usuário")
    console.log("4.Atualizar um usuário já existente")
    console.log("5.Remover um usuário")
    console.log("6.Sair")

    opcao = readline.questionInt()
    return opcao
}
