let express = require('express')

let routes = (Ticket) => {
  let ticketRouter = express.Router()
  ticketRouter.route('/')
    .post((req, res) => {
      if (!req.body.number) {
        res.status(400).send('Ticket number is required')
      } else {
        let ticket = new Ticket(req.body)
        ticket.save()
        res.status(201).send(ticket)
      }
    })
    .get((req, res) => {
      let query = {}
      if (req.query.active) {
        query.active = req.query.active
      } else if (req.query.dev) {
        query.dev = req.query.dev
      } else if (req.query.active && req.query.dev) {
        query.active = req.query.active
        query.dev = req.query.dev
      }
      Ticket.find(query, { '__v': 0 }, (err, tickets) => {
        if (err) {
          res.status(500).send(err)
        } else {
          let returnTickets = []
          tickets.forEach((element, index, array) => {
            let newTicket = element.toJSON()
            // newTicket.links = {}
            // newTicket.links.self = 'http://' + req.headers.host + '/api/books/' + newTicket._id
            returnTickets.push(newTicket)
          })
          res.json(returnTickets)
        }
      })
    })

  ticketRouter.use('/:ticketId', (req, res, next) => {
    Ticket.findById(req.params.ticketId, { '__v': 0 }, (err, ticket) => {
      if (err) {
        res.status(500).send(err)
      } else if (ticket) {
        req.ticket = ticket
        next()
      } else {
        res.status(404).send('No ticket found')
      }
    })
  })

  ticketRouter.route('/:ticketId')
    .get((req, res) => {
      res.json(req.ticket)
    })
    .put((req, res) => {
      if (!req.body.number) {
        res.status(400).send('Ticket number is required')
      } else {
        for (let key in req.body) {
          req.ticket[key] = req.body[key]
        }
        req.ticket.save((err) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.json(req.ticket)
          }
        })
      }
    })
    .delete((req, res) => {
      req.ticket.remove((err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(204).send('Removed')
        }
      })
    })

  return ticketRouter
}

module.exports = routes
