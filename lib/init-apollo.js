import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { baseUrl, isClient, isServer } from '../lib_shared/constants'

let apolloClient = null

if (isServer) {
  global.fetch = fetch
}

function create (initialState) {
  return new ApolloClient({
    connectToDevTools: isClient,
    ssrMode: isServer,
    link: new HttpLink({
      uri: `${baseUrl}/graphql`,
      credentials: 'same-origin'
    }),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  if (isServer) return create(initialState)

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
