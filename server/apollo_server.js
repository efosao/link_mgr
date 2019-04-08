const { ApolloServer, gql } = require('apollo-server-express')

// GraphQL Schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

// GraphQL Schema Resolvers
const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = server
