'use strict'
const conexao = require('../infraestrutura/conexao')
const moment = require('moment')


class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const validaData = moment(data).isSameOrAfter(dataCriacao)
        const validaCliente = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: validaData,
                mensagem: 'data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: validaCliente,
                mensagem: 'Cliente deve ter ao menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json({...resultados, atendimento})
                }
            })
        }
    }
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                const atendimentoretornar = resultados[0]
                res.status(200).json({...atendimentoretornar,id})
            }
        })
    }
    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = `UPDATE Atendimentos SET ? WHERE id=?`
        conexao.query(sql,[valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...resultados, ...valores, id})
            }
        })
    }
    deleta(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id=?`
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...resultados, id})
            }
        })
    }
}

module.exports = new Atendimento;