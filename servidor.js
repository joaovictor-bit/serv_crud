// const express = require("express")
import express from "express"
const app = express()

app.use(express.json())

let ProximoId = 3

let ListarAlunos = [
    {
        id: 1, nome: "joao"
        
    },
    {
        id: 2, nome: "henry"
    },
    {
        id: 3, nome: "mirella"
    }

]


app.get("/",(req,res)=>{
    res.status(200).json({msg: "henry gay"})
})

app.get("/alunos",(req,res)=>{
    res.status(200).json(ListarAlunos)
})

app.get("/alunos/:id",(req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = ListarAlunos.find(a=> a.id === idParametro)
    if (! aluno){
        res.status(404).json({msg:"Aluno não encontrado"})
    }
    res.status(200).json(aluno)
})

app.post("/alunos",(req,res)=>{
    console.log(req.body)
    const {nome} = req.body

    const aluno = {id:ProximoId += 1,nome}
    ListarAlunos.push(aluno)
    res.status(201).json({msg:"Aluno cadastrado com sucesso"})

    if(!nome){
        res.status(400).json({msg:"Preencha o nome"})
    }
    const id = ListarAlunos.length > 0 ? ListarAlunos[ListarAlunos.length -1].id + 1 : 1
})


app.post("/alunos/:id",(req,res)=>{
    return res.status(400).json({msg: "Não preencha o campo com Id"})
})


app.delete("/alunos", (req,res)=>{
    const idParametro = req.params.id ? Number(req.params.id) : 0 
    
    if (idParametro === 0) {
        return res.status(400).json({ msg: "Preencha com um Id" })
    }


})

app.delete("/alunos/:id",(req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = ListarAlunos.findIndex(a=> a.id === idParametro)

    if (aluno== -1){
        return res.status(404).json({msg:"Aluno não encontrado"})
    }
    ListarAlunos.splice(aluno,1)
    return res.status(200).json({msg:"Aluno excluido com sucesso"})
})


app.put("/alunos/:id",(req,res)=>{
    const idParametro = Number(req.params.id)
    const indice = ListarAlunos.findIndex(a=> a.id === idParametro)
    const {nome} = req.body
    if (indice === -1){
        res.status(404).json({msg:"Aluno não encontrado"})
    }

    if (!nome){
        res.status(400).json({msg:"Nome obrigatório"})
    }

    ListarAlunos[indice] = {
        id : idParametro,nome
    }
    res.status(200).json({msg:"Aluno atualizado com sucesso"})
})

app.put("/alunos/", (req, res) => {
    console.log("Parametro do Put: ", req.params)
    const idParametro = req.params.id ? Number(req.params.id) : 0 
    

    if (idParametro === 0) {
        return res.status(400).json({ msg: "id obrigatório" })
    }
})




app.listen(5000, ()=>{
    console.log(`Servidor rodando em `)
})






