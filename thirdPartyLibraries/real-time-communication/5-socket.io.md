## Socket.io

### Socket.IO is composed of two parts:
- A server that integrates with (or mounts on) the Node.JS HTTP Server (the **socket.io** package)
- A client library that loads on the browser side (the **socket.io-client** package)

## Emitting events
The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.

```js
const express = require('express')
const http = require('http')
const path = require('path')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const wsServer = new Server(server)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

wsServer.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', (socket) => {
        console.log('user disconnected')
    })
    socket.on('chat message', (message) => {
        console.log(message)
        wsServer.emit('chat message', message) // emiting the event to every connected socket so
        // broadcasting to every connected socket
    })
})

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'index.html'))
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
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Socket.IO chat</title>
    <style>
      body {
        margin: 0;
        padding-bottom: 3rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
      }

      #form {
        background: rgba(0, 0, 0, 0.15);
        padding: 0.25rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 3rem;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
      }
      #input {
        border: none;
        padding: 0 1rem;
        flex-grow: 1;
        border-radius: 2rem;
        margin: 0.25rem;
      }
      #input:focus {
        outline: none;
      }
      #form > button {
        background: #333;
        border: none;
        padding: 0 1rem;
        margin: 0.25rem;
        border-radius: 3px;
        outline: none;
        color: #fff;
      }

      #messages {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #messages > li {
        padding: 0.5rem 1rem;
      }
      #messages > li:nth-child(odd) {
        background: #efefef;
      }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
  </body>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    // That’s all it takes to load the socket.io-client, which exposes an io global
    // (and the endpoint GET /socket.io/socket.io.js), and then connect.
    // If you would like to use the local version of the client-side JS file, you can find it at node_modules/socket.io/client-dist/socket.io.js
    // Notice that I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page

    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const messages = document.getElementById("messages");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit("chat message", input.value); // emit for single user
        input.value = "";
      }
    });

    socket.on("chat message", (msg) => {
      const item = document.createElement("li");
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  </script>
</html>

```
