const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/', (req, res) => res.status(404).end())
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, res)
    })
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const atendimento = req.body
        Atendimento.altera(id, atendimento, res)
    })
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.deleta(id, res)
    })
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
    })

}