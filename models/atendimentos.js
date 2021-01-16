'use strict'
const conexao = require('../infraestrutura/conexao')
class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = new Date()
        const atendimentoDatado = {...atendimento, dataCriacao}
        const sql = 'INSERT INTO Atendimentos SET ?'
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
                console.log(erro)
            }else{
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento;