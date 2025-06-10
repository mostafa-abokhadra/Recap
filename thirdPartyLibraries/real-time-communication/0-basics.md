# Real time communication
Real-time communication in Node.js enables instant, bidirectional data exchange between the server and clients. It's crucial for applications like chat, live updates, and collaborative tools. 

### web sockets
WebSockets is a protocol that enables real-time communication between clients and servers. It provides a full-duplex communication channel over a single TCP connection, allowing real-time data exchange between clients and servers. This module called ‘ws’ that can be used to implement WebSockets.
```js
const ws = require('ws')
```
### Socket.IO
Socket.IO simplifies the implementation of real-time communication. It abstracts WebSockets and provides fallback mechanisms for environments where WebSockets aren't supported, such as older browsers. It also offers features like automatic reconnection and broadcasting

### server-sent-evnet
Server-Sent Events is a simple protocol that allows servers to send events to clients over an HTTP connection. It is ideal for applications that require one-way communication, such as live sports scores or stock market updates. This module called ‘sse’ that can be used to implement Server-Sent Events.

### webRTC
WebRTC is a real-time communication protocol that allows browsers to establish peer-to-peer connections. It provides a low-latency communication channel between clients without the need for a server. This ‘node-webrtc’ that can be used to implement WebRTC.

## Ref
- [real time communication technologies](https://medium.com/@ben.dev.io/node-js-for-real-time-communication-cf71f985f983)
