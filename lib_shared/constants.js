const isServer = typeof window === 'undefined'

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: 'http://localhost:3000',
  isDev: !isProd,
  isProd,
  isClient: !isServer,
  isServer
}
