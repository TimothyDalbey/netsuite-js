'use strict';

const denodeify = require('denodeify');
const NetSuite = require('../');

const builtTO = createTO();

function createTO(){
	const credentials = require('./credentials.json');
	const config = new NetSuite.Configuration(credentials);
	const service = new NetSuite.Service(config);
	service.init(true).then(async function(){
		console.log('WSDL Processed');
		const to = new NetSuite.Records.TransferOrder();
		to.tranId = "TO1234";
		to.tranDate = "2019-03-31T02:02:09+00:00";
		to.subsidiary = "2";
		to.location = "24";
		to.transferLocation = "1";
		to.externalId = "TO1234"
		to.items = ["2468234product"];
		to.customSourceID = "123123"

		const checkItems = [];
		for(let i = 0; i < to.items.length; i++){
			const item = to.items[i];
			const recordRef = new NetSuite.Records.RecordRef();
			recordRef.externalId = item;
			recordRef.type = 'inventoryItem';
			checkItems.push(recordRef);
		}
		//result.readResponseList.readResponse[0].record.binNumberList.binNumber[0].binNumber.name
		
		let items = await service.getList(checkItems);
		if(items.readResponseList.readResponse.length === checkItem.length){
			console.log('Performing TO creation');
			return service.upsert(to);
		}

	}).then(function(result, raw, soapHeader){
		console.log('SUCESS');
		console.log('Request: ');
		console.log(service.config.client.lastRequest);
		return result
	}).catch(function(err){
		console.error(err);
		console.error('Error Request:');
		console.error(service.config.client.lastRequest);
	});
}
