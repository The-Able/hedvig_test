const express = require ('express');
const router = express.Router();
const Contract = require('../models/contract');

router.get('/contracts', (req, res, next) => {
    
  //this will return all the data, exposing only the id and action field to the client
  Contract.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/contracts/event', async (req, res, next) => {
    const event = req.body;
    switch(event.name) {
        case 'ContractCreatedEvent':
            if(!event.contractId) 
                return res.json({error: "The contractId is required"});
            if(!event.premium) 
                return res.json({error: "The premium field is required"});
            if(!event.startDate) 
                return res.json({error: "The start date of the contract is required"});
            
            var contract = await Contract.findOne({contractId: event.contractId}).exec();
            if(contract) {
                return res.json({error: "The contract already exists"});
            }
            contract = await Contract.create({contractId: event.contractId, premium: event.premium, startDate: event.startDate});
            // console.log(contract);
            return res.json(contract);
            break;
        case 'ContractTerminatedEvent':
            if(!event.contractId) 
                return res.json({error: "The contractId is required"});
            if(!event.terminationDate) 
                return res.json({error: "The termination date of the contract is required"});
            
            var contract = await Contract.findOne({contractId: event.contractId}).exec();
            if(!contract) {
                return res.json({error: "The contract doesn't exist"});
            }
            if(contract.terminationDate) return res.json({error: "The contract has already been terminated"});
            // console.log(contract.startDate);
            // console.log(event.terminationDate);
            if(new Date(contract.startDate) > new Date(event.terminationDate)) return res.json({error: "The terminationDate can't be earlier than startDate of the contract"});
            contract.terminationDate = event.terminationDate;
            await contract.save();
            return res.json(contract);
            break;
        default:
            return res.json({error: "The event name is incorrect"})
    }
});

module.exports = router;