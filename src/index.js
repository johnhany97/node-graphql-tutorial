const {
  GraphQLServer
} = require('graphql-yoga')
const {
  Prisma
} = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

// resolvers
// This is the actual implementation of the GraphQL Schema. It's structure
// is notably identical to that of the type definition (inside `typeDefs: Query.info`)
const resolvers = {
  Query,
  Mutation,
  AuthPayload,
}

// Both the typeDefs and the resolvers are bundled together
// and passed to the GraphQLServer which is imported from 
// `graphql-yoga`. This tells the server what API operations
// are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/john-h-ayad-3bdf05/database/dev',
      secret: 'mysecret123',
      debug: true,
    })
  })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))