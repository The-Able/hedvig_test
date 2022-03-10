const Contract = require('./models/contract');
const lineReader = require('line-reader');

const readContracts = () => {
    if(process.env.READFILE == 0) return;
    lineReader.eachLine('./contracts.txt', async (line,last)=>{
        // console.log(line);
        const event = JSON.parse(line);
        // console.log(event);
        switch(event.name) {
            case 'ContractCreatedEvent':
                if(!event.contractId || !event.premium || !event.startDate) break;
                var contract = await Contract.findOne({contractId: event.contractId}).exec();
                if(contract) break;
                await Contract.create({contractId: event.contractId, premium: event.premium, startDate: new Date(event.startDate)});
                break;
            case 'ContractTerminatedEvent':
                if(!event.contractId || !event.terminationDate) break;
                
                var contract = await Contract.findOne({contractId: event.contractId}).exec();
                // console.log(contract);
                if(!contract) break;
                contract.terminationDate = new Date(event.terminationDate);
                // console.log(contract);
                await contract.save();
               break;
            default:
                break;
        }
    })
}

module.exports = readContracts;