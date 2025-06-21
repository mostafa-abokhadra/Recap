# Redis

Redis is an open-source, in-memory data structure store, often used as a database, cache, and message broker. It's known for its speed and efficiency due to storing data in memory. Redis supports various data structures like strings, lists, hashes, sets, and more. It's commonly used for caching, session management, real-time analytics, and message queuing. 
Here's a more detailed breakdown:
Key Features and Benefits:
In-Memory Data Store: Redis stores data in RAM, resulting in very low latency and high throughput. 
NoSQL Key-Value Store: It's a NoSQL database that uses a simple key-value data model. 
Versatile Data Structures: Supports various data types like strings, lists, hashes, sets, and sorted sets, allowing for complex data manipulation. 
Optional Durability: Redis can persist data to disk for persistence, but it's not the default behavior. 
Built-in Replication: Offers replication for high availability and disaster recovery. 
Client-Server Architecture: Uses a request-response model for interacting with applications. 
Lua Scripting: Allows for server-side scripting using Lua for complex operations. 
Caching: Widely used as a caching layer to reduce database load and improve application performance. 
Real-time Applications: Suitable for real-time data processing, such as chat applications and live feeds. 
Vector Search: Redis can be used as a vector database for similarity searches. 
Use Cases:
Caching: Storing frequently accessed data to speed up application performance.
Session Management: Keeping track of user sessions.
Real-time Analytics: Processing and analyzing data in real-time.
Message Queuing: Facilitating communication between different parts of an application.
Gaming Leaderboards: Storing and managing leaderboard data.
E-commerce: Storing product catalogs and user information.
AI/ML: Used in AI applications for vector embeddings and real-time inference. 
Redis vs. Traditional Databases:
Redis is often contrasted with traditional relational databases. While traditional databases excel in data consistency and complex querying, Redis offers speed and simplicity for specific use cases. It's a complementary technology that can be used alongside traditional databases to optimize performance. 

## install 
```bash
npm install express express-session redis connect-redis
```

## sever side code
```js
const redis = require('redis')

const redisClient = new redis.createClient()

const connectToRedis = async () => {
    try {
        await redisClient.connect()

    if (redisClient.isReady)
        console.log('redis is ready')
    } catch(error) {
        console.log(error)
    } 
}

const addToRedisCach = async () => {
    try {
        const result = await redisClient.set('name', 'abokhadra')
        const value = await redisClient.get('name')
    } catch(error) {
        //code..
    }
}

const deleteFromCach = async () => {
    try {
        await redisClient.del('name')
    } catch(error) {
        // code..
    }
}
const main = async () => {
    await connectToRedis()
    await addToRedisCach()
    await deleteFromCach()
    await redisClient.quit()
}
main()
```
In essence, Redis is a powerful tool for building fast and scalable applications by leveraging its in-memory data storage and versatile data structures

## for session store
```js
const express = require('express');
const session = require('express-session');

const Redis = require('redis');
const RedisStore = require('connect-redis').RedisStore;

const redisClient = Redis.createClient();
redisClient.connect().catch(console.error);

const store = new RedisStore({client: redisClient});

const app = express();

app.use(session({
  store:  store,
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 30 }
}));

app.get('/', async (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  await redisClient.set('views', req.session.views)
  res.send(`Views: ${req.session.views}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

```
