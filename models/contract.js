const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const ContractSchema = new Schema({
  contractId: {
    type: Number,
    required: [true, 'The contract ID field is required'],
    unique: true
  },
  premium: {
    type: Number,
    required: [true, 'The premium field is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'The start date of contract is required']
  },
  terminationDate: {
    type: Date,
    default: null
  }
})

//create model for contract
const Contract = mongoose.model('contract', ContractSchema);

module.exports = Contract;