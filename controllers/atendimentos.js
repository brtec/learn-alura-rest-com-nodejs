const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/', (req, res) => res.status(404).end())
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos'))
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
        res.send('Post atendimento Recebido e Salvo')
    })

}