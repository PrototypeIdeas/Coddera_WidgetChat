var purecloudConfig = {};
purecloudConfig.widget = {};

//CREATE CHAT CONFIG
purecloudConfig.widget.CREATE_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations'

purecloudConfig.widget.PURECLOUD_ORG_ID = '947659c0-d25d-4f72-b07f-bf5181952f5b';
purecloudConfig.widget.PURECLOUD_DEPLOYMENT_ID = '7539c714-2e65-402d-aff2-37f8362dd67e';
purecloudConfig.widget.TARGET_ADRESS = 'Atlas';
purecloudConfig.widget.LANGUAGE = 'pt-BR';


//SEND MESSAGE CONFIG

purecloudConfig.widget.SEND_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}/messages'



module.exports = purecloudConfig;