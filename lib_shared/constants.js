const isServer = typeof window === 'undefined'

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  isDev: !isProd,
  isProd,
  isClient: !isServer,
  isServer
}
