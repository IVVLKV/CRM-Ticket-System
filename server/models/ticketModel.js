let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TicketSchema = new Schema({
  link: String,
  number: String,
  status: String,
  requestor: String,
  dev: String,
  qa: String,
  priority: String,
  designer: String,
  deadline: String,
  category: String,
  notes: String,
  files: String,
  active: { type: Boolean, default: true }
})

module.exports = mongoose.model('ticket', TicketSchema)
