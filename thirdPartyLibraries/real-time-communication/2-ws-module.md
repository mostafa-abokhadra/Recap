## ws
ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.

> [!IMPORTANT]
> This module does not work in the browser. The client in the docs is a reference to a backend with the role of a client in the WebSocket communication. Browser clients must use the native WebSocket object.

```js
// basic server
const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const path = require('path')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        if (typeof message === 'string') {
            console.log('Received text message:', message);
        }

        if (message instanceof Buffer) {
            const text = message.toString('utf8'); // Convert Buffer to string
            console.log('Received binary message as text:', text);
        }

        if (message instanceof ArrayBuffer) {
            const buffer = Buffer.from(message);
            const text = buffer.toString('utf8');
            console.log('Received ArrayBuffer as text:', text);
        }

        wss.clients.forEach( client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(`a message from ws server: ${message}`)
        })
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
    return res.render('home')
})

const PORT = 8080;
server.listen(PORT, () => {  // Use the HTTP server, not app.listen()
    console.log(`Server running on http://localhost:${PORT}`);
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>WebSocket</title>
    <style>
      #messages {
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #ccc;
      }
    </style>
  </head>
  <body>
    <h1>WebSocket Demo</h1>

    <div id="messages"></div>

    <input type="text" id="messageInput" placeholder="Type a message" />
    <button onclick="sendMessage()">Send</button>

    <script>
      const ws = new WebSocket(`ws://localhost:8080`);
      const messages = document.getElementById("messages");
      const input = document.getElementById("messageInput");

      ws.onmessage = (event) => {
        const message = document.createElement("div");
        console.log(event);
        message.textContent = event.data;

        messages.appendChild(message);
      };

      function sendMessage() {
        ws.send(input.value);
        input.value = "";
      }

      // Send on Enter key
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
      });
    </script>
  </body>
</html>

```

## Ref
continue reading from [npm ws package](https://www.npmjs.com/package/ws)
