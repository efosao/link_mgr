const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes.add('index', '/:id')

module.exports = routes
