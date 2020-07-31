/*=================================================================*/
const purecloudConfig = require('../../../config/purecloudConfig');
var request = require('request');
const SEND_URL = purecloudConfig.widget.SEND_URL;

module.exports = {
	sendMsg : function(req, res, callback) {
        // Authenticate with PureCloud
        var conversationId = req.body.conversationId;
		var memberId = req.body.memberId;
		var bodyType = req.body.bodyType;
		var msg = req.body.msg;
		var token = req.body.token;
		
		const chatMsgData = {
			body: msg,
			bodyType: bodyType
		  }
		
		var options = {
			'method': 'POST',
			'url': SEND_URL.replace('{conversationId}', conversationId).replace('{memberId}', memberId),
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},

			body: JSON.stringify(chatMsgData)
		};

		request(options, function (error, response) { 
			if (error) throw new Error(error);
			console.log(response.body);
			callback(response.body)
		});
		  

		// var xhttp = new XMLHttpRequest();
    
		// xhttp.onloadend = function() {
		// 		if (this.status == 200) {
		// 			console.log('Success: ' + this.response);
		// 			callback(this.response);
		// 		}else{
		// 			console.log('Teste: ' + this);
		// 			callback(this);
		// 		}

		// };

		// xhttp.open("POST", SEND_URL.replace('{conversationId}', conversationId).replace('{memberId}', memberId), true);
		// xhttp.setRequestHeader("Content-type", "application/json");
		// xhttp.setRequestHeader("Authorization", "Bearer " + token);
		// xhttp.send(JSON.stringify(chatMsgData));

		// const axios = require('axios')

		// var url = SEND_URL.replace('{conversationId}', conversationId).replace('{memberId}', memberId)

		// axios.defaults.headers.common['Authorization'] = token;
		// axios.post(url, chatMsgData)
		// .then(({data}) => {
		// 	console.log('Success: ' + JSON.stringify(data));
		// 	callback(JSON.stringify(data));
		// })
		// .catch((error) => {
		// 	console.error(error);
		// 	console.error(token);
		// 	callback(error);
		// })
	}
};