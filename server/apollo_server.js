const { ApolloServer, gql } = require('apollo-server-express')
const db = require('./db')

// GraphQL Schema
const typeDefs = gql`
  type Link {
    id: String
    url: String
  }

  type Query {
    getLinks (id: String!): [Link]
  }

  type Mutation {
    addLink (id: String!, url: String!): Link
  }
`

// GraphQL Schema Resolvers
const resolvers = {
  Query: {
    getLinks: ($, { id }) => db.getLinksCollById(id)
  },
  Mutation: {
    addLink: ($, { id, url }) => db.addLink(id, url)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = server
