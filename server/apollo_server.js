const { ApolloServer, gql } = require('apollo-server-express')

// GraphQL Schema
const typeDefs = gql`
  type Query {
    getLinks (id: String!): [String]
  }
`

// GraphQL Schema Resolvers
const resolvers = {
  Query: {
    getLinks: ($, { id }) => [
      'hello',
      'world',
      id
    ]
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = server
