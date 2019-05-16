'use strict'

import path from 'path'
import fastify from 'fastify'
import serveStatic from 'fastify-static'
import SocketIO from 'socket.io'
import socketHandler from './socket'

const app = fastify({
  logger: {
    level: 'debug',
    prettyPrint: {
      colorize: true,
      translateTime: true
    },
  }
})
const io = SocketIO(app.server)
socketHandler(io, app.log)

app.register(serveStatic, {
  root: path.join(__dirname, '../www/dist'),
})

app.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

const start = async app => {
  try {
    await app.listen(3000)
  } catch (err) {
    app.log.error(err) 
    process.exit(1)
  }
}

start(app)
