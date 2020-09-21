var purecloudConfig = {};
purecloudConfig.widget = {};
purecloudConfig.aws = {};

//CREATE CHAT CONFIG
purecloudConfig.widget.CREATE_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations'

purecloudConfig.widget.PURECLOUD_ORG_ID = 'f3dbd60b-80a2-47db-a761-9654fbefb9c7';
purecloudConfig.widget.PURECLOUD_DEPLOYMENT_ID = 'c8a1b68d-855e-49c8-a052-1f6aa7516f1a';
purecloudConfig.widget.TARGET_ADRESS = 'Atlas';
purecloudConfig.widget.LANGUAGE = 'pt-BR';


//SEND MESSAGE CONFIG

purecloudConfig.widget.SEND_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}/messages'


//SEND TYPING CONFIG
purecloudConfig.widget.SEND_TYPING_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}/typing'

//FINALYZE CONFIG
purecloudConfig.widget.FINALYZE_URL = 'https://api.mypurecloud.com/api/v2/webchat/guest/conversations/{conversationId}/members/{memberId}'

//AWS CONFIG
purecloudConfig.aws.ACCESS_KEY_ID = 'AKIAQW73BXXT7WEYX5FZ'
purecloudConfig.aws.SECRET_ACCESS_KEY = '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'
purecloudConfig.aws.AWS_REGION = 'sa-east-1'
purecloudConfig.aws.S3_BUCKET = 'anexossebrae'

module.exports = purecloudConfig;