import 'babel-polyfill'
import express from 'express'
import next from 'next'
import getTicket from './get-ticket'
import routes from './routes'


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.get('/get-ticket', getTicket)

  server.use(handler)
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})