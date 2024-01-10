const express = require('express')
const redis = require('redis')


const app = express()
const port = 3001

let publisher = redis.createClient({
    url: 'redis://localhost:6379'
})

publisher.on('error', (err) => console.log('Redis Error'))

publisher.on('connect', (message) => console.log('Redis Connected'))

const connect = async () => {
    await publisher.connect()
}

connect()


app.get('/', (req, res) => {
    res.send({message: 'Publisher active from port 3001'})
})

app.get('/publish', async(req, res) => {
    const id = Math.floor(Math.random() * 10)
    const data = {
        id,
        message: `Message- ${id}`
    }
    await publisher.publish('message', JSON.stringify(data))
    res.send({message: 'Data published', data})
})



app.listen(port, () => {
console.log('Publisher server started on 3001');
})