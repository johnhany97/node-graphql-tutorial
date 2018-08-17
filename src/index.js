const { GraphQLServer } = require('graphql-yoga')

// Currently, this is used to store the links at runtime.
// We're storing in in-memory rather than in a database for now..
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}]
let idCount = links.length
// resolvers
// This is the actual implementation of the GraphQL Schema. It's structure
// is notably identical to that of the type definition (inside `typeDefs: Query.info`)
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links, // A resolver for the fields for the `feed` root field. 
  },
  Mutation {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
}

// Both the typeDefs and the resolvers are bundled together
// and passed to the GraphQLServer which is imported from 
// `graphql-yoga`. This tells the server what API operations
// are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql'
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))