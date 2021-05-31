const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Usuario = require('./models/Usuario')

//Config
    //Template Engine
        app.engine("handlebars", handlebars({
            defaultLayout: "main",
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },           
        }))
        app.set("view engine", "handlebars")
    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())   

//ROTAS

//inicial
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/index.html") //dirname retorna o diretorio padrao
})

//consulta todos
app.post("/usuarios", function(req,res) {
    Usuario.findAll( {
        attributes: ["nome", "idade", "createdAt", "updatedAT"]
    }).then(function(usuario) {
        res.render("usuarios", {
            usuarios: usuario, 
            nome:usuario.nome, 
            idade:usuario.idade, 
            createdAt:usuario.createdAt, 
            updatedAT:usuario.updatedAT})
    })
})
//consulta um unico usuario
app.post("/usuario", function(req, res) {
    res.render("idConsultar", {id : req.body.id})
})

app.post("/usuario/:id", function(req, res) {   
    Usuario.findOne( {where: {id : req.params.id}
    }).then(function(usuario) {
        res.render("usuario", {
            usuarios: usuario, 
            nome:usuario.nome, 
            idade:usuario.idade, 
            createdAt:usuario.createdAt, 
            updatedAT:usuario.updatedAT})
    }).catch(function(err) {
        res.send("ERRO: " + err)
    })
})

//cadastrar um usuario
app.post("/cadastrar", function(req, res) {
    res.render("cadastro")
})

app.post("/cadastrado", function(req, res) {
    Usuario.create({
        nome: req.body.nome,
        idade: req.body.idade
    }).then(function() {
        res.sendFile(__dirname + "/html/cadastrado.html")
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
    
})

//atualiza um usuario
app.post("/atualizar", function(req,res) {
    res.render("idEditar", {id: req.body.id})
})

app.post("/atualizar/atualizado",function(req,res){
    Usuario.findOne({where: {"id": req.body.id}}
    ).then(function(usuario){
        usuario.nome = req.body.nome
        usuario.idade = req.body.idade
        usuario.save()
        res.sendFile(__dirname + "/html/atualizado.html") 
    }).catch(function(err){
        res.send("Erro: " + err)
    })       
})
//Exclui um usuario pelo id
app.post("/excluir", function(req, res) {
    res.render("idExcluir")
})

app.post("/excluido", function(req,res) {
    Usuario.destroy({where: {"id": req.body.id}}).then(function(){
        res.sendFile(__dirname + "/html/excluido.html")
    }).catch(function(erro){
        res.send("Não foi possível remover o usuario: " + erro)
    })
})

//Resource: O "nome" do caminho que fazemos até um endpoint, ex /blablabla
// Verbos HTTP
// get: Receber dados de um Resource.
// post: Envia dados ou informações para serem processadas por um Resource.
// put: Atualiza dados de um Resource.
// delete: Deletar um Resource.

app.listen(8081, function(){
    console.log("Server rodando na url http://localhost:8081")
}) //inicia o server, por consequencia, tem que ser a ultima