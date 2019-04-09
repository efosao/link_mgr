const isServer = typeof window === 'undefined'

const isProd = process.env.NODE_ENV === 'production'
const port = parseInt(process.env.PORT, 10) || (isProd ? 80 : 5050)

module.exports = {
  baseUrl: `http://localhost:${port}`,
  isDev: !isProd,
  isProd,
  isClient: !isServer,
  isServer,
  port
}
