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
    link: (root, args) => links.find(x => x.id === args.id),
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      let index = links.findIndex(x => x.id === args.id)
      if (index !== -1) {
        let copy = links[index]
        copy.url = args.url ? args.url : copy.url
        copy.description = args.description ? args.description : copy.description
        links[index] = copy
        return copy
      }
    },
    deleteLink: (root, args) => {
      let link = links.find(x => x.id === args.id)
      links = links.filter(x => x.id !== args.id)
      return link
    }
  },
}

// Both the typeDefs and the resolvers are bundled together
// and passed to the GraphQLServer which is imported from 
// `graphql-yoga`. This tells the server what API operations
// are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))