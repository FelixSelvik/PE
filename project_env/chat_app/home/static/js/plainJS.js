const NodeRSA = require('node-rsa');
const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
                      'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
                      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
                      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
                      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
                      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
                      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
                      '-----END RSA PRIVATE KEY-----');
const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/socket-server/'
);

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    let messages = document.getElementById('messages')
    var removeColon = data.message.split(':');
    var userandchat = removeColon[0].trim();
    var removerHash = userandchat.split('@');
    var chatRoom = removerHash[0].trim();
    var chatUsername = removerHash[1].trim();
    var encryptedMessage = removeColon[1].trim();
    var decryptedMessage = key.decrypt(encryptedMessage, 'utf8');
    const textArea = document.getElementById("messages");
    const date = new Date();
    const currentDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const currentTime = date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
    if (chatRoom == chatname) {  
        if (chatUsername === userName) {
            messages.insertAdjacentHTML('beforeend', `<div>
                    <p class=User1><span>${chatUsername}</span>: ${decryptedMessage}</p>
                </div>`);
            messages.insertAdjacentHTML('beforeend', `<div>
                <p class=User1Time>${currentDate}, ${currentTime}</p>
            </div>`)
        }
        else {
            messages.insertAdjacentHTML('beforeend', `<div>
                    <p class=User2><span>${chatUsername}</span>: ${decryptedMessage}</p>
                </div>`)
            messages.insertAdjacentHTML('beforeend', `<div>
                <p class=User2Time>${currentDate}, ${currentTime}</p>
            </div>`)
        }
        textArea.scrollIntoView({ block: "end" });
    };
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function (e) {
    var messageInputDom = document.querySelector('#chat-message-input');
    if (messageInputDom.value !== '') {
        var unencryptedMessage = messageInputDom.value;
        var message = key.encrypt(unencryptedMessage, 'base64');
        chatSocket.send(JSON.stringify({
            'message': chatname + "@" + userName + ": " + message
        }));
        messageInputDom.value = '';
    }
};