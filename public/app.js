(function () {
  const app = document.querySelector('.app');
  const socket = io();

  let uname;

  app
    .querySelector('.join_screen #join_user')
    .addEventListener('click', function () {
      let username = app.querySelector('.join_screen #username').value;
      if (username.length == 0) {
        return;
      }
      socket.emit('newuser', username);
      uname = username;
      app.querySelector('.join_screen').classList.remove('active');
      app.querySelector('.chat_screen').classList.add('active');
    });
  app
    .querySelector('.chat_screen #send_message')
    .addEventListener('click', function () {
      let message = app.querySelector('.chat_screen #message_input').value;
      if (message.length == 0) {
        return;
      }
      renderMessage('my', {
        username: uname,
        text: message,
      });
      socket.emit('chat', {
        username: uname,
        text: message,
      });
      app.querySelector('.chat_screen #message_input').value = '';
    });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector('.chat_screen .messages');
    if (type == 'my') {
      let el = document.createElement('div');
      el.setAttribute('class', 'message my_message');
      el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
      messageContainer.appendChild(el);
    } else if (type == 'other') {
      let el = document.createElement('div');
      el.setAttribute('class', 'message other_message');
      el.innerHTML = `
                  <div>
                      <div class="name">${message.username}</div>
                      <div class="text">${message.text}</div>
                  </div>
              `;
      messageContainer.appendChild(el);
    } else if (type == 'update') {
      let el = document.createElement('div');
      el.setAttribute('class', 'update');
      el.innerText = message;
      messageContainer.appendChild(el);
    }

    // Scroll chat to end
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }
})();
//24:36
