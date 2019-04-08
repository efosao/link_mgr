const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const next = require('next')
const { isDev } = require('../lib_shared/constants')

const port = parseInt(process.env.PORT, 10) || 3000
const server = next({ dev: isDev })

server.prepare()
  .then(() => {
    const handle = server.getRequestHandler(server)
    const app = express()

    app.get('/health', (req, res) => res.send('ok'))
    app.use(bodyParser.json())
    app.use(cookieParser())

    app.get('*', (req, res) => handle(req, res))

    app.listen(port, (err) => {
      if (err) throw err
      const mode = isDev ? 'DEVELOPMENT' : 'PRODUCTION'
      console.log(`> Server is ready on http://localhost:${port} - [${mode}]`)
    })
  })
