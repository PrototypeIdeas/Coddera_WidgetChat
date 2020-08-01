const host = "http://ec2-18-228-171-32.sa-east-1.compute.amazonaws.com:3000";
//const host = "http://localhost:3000";

function widget() {
    $('#purecloud-widget').load(host + "/coddera-widget", function () {
        $("#initial_card_widget_logo").attr("src", host + "/images/sebrae_1.png");
        $("#card_widget_logo").attr("src", host + "/images/sebrae_1.png");
        $(".send-msg-btn").css('background-image', 'url("' + host + '/images/send_btn.png' + '")');
        $("#form-body").css('background-image', 'url("' + host + '/images/sebrae_back.png' + '")');

        var submitButton = document.getElementById('submit-widget');
        var initialButton = document.getElementById('initial-widget-btn');
        var openFormButton = document.getElementById('open-form-widget-button');
        var firstName = document.getElementById('first-name');
        var phoneNumber = document.getElementById('phone-number');
        var email = document.getElementById('email');
        var question = document.getElementById('question');;
        var removeBtn = document.getElementById('remove-coddera-widget-card-btn');

        var chatObj = {
            member: {id: ''},
            data: {}
        };
    
        $('#coddera-widget-card').slideToggle("fast");
    

        document.getElementById('send-msg-btn').onclick = function (){
            var msg = $('.send-msg-txt').val();
            sendMsg(msg, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
        }

        initialButton.onclick = function () {
            $('.initial-card').slideToggle("fast");
            $('.card-footer').hide();
            $('.custom-card-header').show();
            $('#form-body').show();
        }

        removeBtn.onclick = function () {
            $('#coddera-widget-card').slideToggle("fast");
            $('#open-form-widget-button').show();
        }
    
        openFormButton.onclick = function (){
            $('#coddera-widget-card').slideToggle("fast");
            $('#open-form-widget-button').hide();
        }
    
        firstName.oninput = function (){
            $('#form-group').css('border-bottom', '2px solid #FCAF17');
            if(firstName.value != "" && phoneNumber.value != "" && email.value != "" && question.value != ""){
                $('#submit-widget').prop("disabled", false);
            }
    
            if(firstName.value == "" || phoneNumber.value == "" || email.value == "" || question.value == ""){
                $('#submit-widget').prop("disabled", true);
            }
        }
        phoneNumber.oninput = function (){
            if(firstName.value != "" && phoneNumber.value != "" && email.value != "" && question.value != ""){
                $('#submit-widget').prop("disabled", false);
            }
    
            if(firstName.value == "" || phoneNumber.value == "" || email.value == "" || question.value == ""){
                $('#submit-widget').prop("disabled", true);
            }
        }

        email.oninput = function (){
            if(firstName.value != "" && phoneNumber.value != "" && email.value != "" && question.value != ""){
                $('#submit-widget').prop("disabled", false);
            }
    
            if(firstName.value == "" || phoneNumber.value == "" || email.value == "" || question.value == ""){
                $('#submit-widget').prop("disabled", true);
            }
        }

        question.oninput = function (){
            if(firstName.value != "" && phoneNumber.value != "" && email.value != "" && question.value != ""){
                $('#submit-widget').prop("disabled", false);
            }
    
            if(firstName.value == "" || phoneNumber.value == "" || email.value == "" || question.value == ""){
                $('#submit-widget').prop("disabled", true);
            }
        }

        // tryAgainButton.onclick = function () {
        //     $('#phrase-nok').hide();
        //     $('#phrase').show();
        //     $('#form-widget').show();
        //     $('#description-nok').hide();
        //     firstName.value = "";
        //     phoneNumber.value = "";
        //     var data = {
        //         name: "",
        //         phone: ""
        //     };
        // };
    
        submitButton.onclick = function () {
            $('.card-body').slideToggle("fast");
            $('.wait-card').show();

            var data = {
                name: firstName.value,
                phone: phoneNumber.value.replace(/ /g, ''),
                email: email.value
            };
            
            var xhttp = new XMLHttpRequest();

            xhttp.onloadend = function() {
                console.log("Status: " + this.status);
                while(this.status == 0){
                    console.log('wait');
                }
                 if (this.status == 200) {
                    $('.wait-card').hide();
                    $('.custom-card-body').slideToggle("fast");
                    chatObj.data = JSON.parse(this.response).data;
                    
                    var socket = new WebSocket(chatObj.data.eventStreamUri, "protocolOne");
                    
                    $('#dialog-header').append('<p>Conversa iniciada às 00:00. Aguarde, um atendente logo estará disponível</p>');

                    socket.onopen = function(event){
                        sendMsg(question.value, chatObj.data.id, chatObj.data.member.id, chatObj.data.jwt);
                    }

                    socket.onmessage = function (event) {
                        console.log(event.data);
                        var eventData = JSON.parse(event.data);

                        if(eventData.eventBody.member != undefined){
                            if(eventData.eventBody.member.state == 'ALERTING'){
                                chatObj.member.id = eventData.eventBody.member.id;
                            }else if(eventData.eventBody.member.state == 'CONNECTED' && chatObj.member.id == eventData.eventBody.member.id){                                
                                $('.custom-card-footer').show();
                                $('.chat-dialog').append('<p>O operador acabou de se connectar.</p>')
                            } else if (eventData.eventBody.member.state == 'DISCONNECTED' && chatObj.member.id == eventData.eventBody.member.id){
                                socket.close();
                                $('.custom-card-footer').hide();
                                $('.chat-dialog').append('<p>O chat foi encerrado. Obrigado pelo contato</p>');
                            }
                        }else{
                            if(eventData.eventBody.bodyType != undefined){
                                if(eventData.eventBody.bodyType == 'standard'){                                    
                                    if(chatObj.member.id == eventData.eventBody.sender.id){
                                        var html = "";
                                        if(eventData.eventBody.body != ''){
                                            html += '<div class="block-dialog"  id="block-agent">';
                                            html += '<div class="agent-msg">'
                                            html += eventData.eventBody.body
                                            html += '</div>';
                                            html += '<div class="agent-name">Atendente</div>';
                                            html += '</div>';
                        
                                            $('.chat-dialog').append(html);
                                            document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
                                        }
                                    }
                                }
                            } else {
                                console.log('EVENTO IGNORADO');
                            }
                        }
                    }
                 }else{
                    console.log("ERROR");
                 }
            };

            xhttp.open("POST", host + "/coddera-widget/chat/create", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data));    
			    
        };
    });
};

function sendMsg(msg, id, memberId, token) {

    var data = {
        conversationId: id,
        memberId: memberId,
        token: token,
        msg: msg,
        bodyType: "standard"
    };

    var xhttp = new XMLHttpRequest();
    
    xhttp.onloadend = function() {

        console.log('Response Code: ' + this.status)
        console.log('Response: ' + this.response)

        if (this.status == 200) {
            var html = "";
            if(msg != ''){
                html += '<div class="block-dialog"  id="block-client">';
                html += '<div class="client-msg">'
                html += msg
                html += '</div>';
                html += '<div class="client-name">Você</div>';
                html += '</div>';

                $('.chat-dialog').append( html);
            }

            document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
            $('.send-msg-txt').val("");
        }else{
            console.log('ERROR: ' + this.response)
        }

    };

    xhttp.open("POST", host + "/coddera-widget/chat/send", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
}

widget();
