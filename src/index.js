const { GraphQLServer } = require('graphql-yoga')

// typeDefs
// Defines the GraphQL schema. Currently, a simple `Query` type with
// one field called `info`. This field has the type `String!` and the !
// is to make sure it is never `null`
const typeDefs = `
type Query {
  info: String!
}
`

// resolvers
// This is the actual implementation of the GraphQL Schema. It's structure
// is notably identical to that of the type definition (inside `typeDefs: Query.info`)
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

// Both the typeDefs and the resolvers are bundled together
// and passed to the GraphQLServer which is imported from 
// `graphql-yoga`. This tells the server what API operations
// are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))