const graphql = require("graphql");
const lodash = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const books = [
  {
    name: "kitob",
    genre: "Fantasy",
    id: "1",
  },
  {
    name: "kniga",
    genre: "Fantasy",
    id: "2",
  },
  { name: "Book", genre: "fantasy", id: "3" },
];
const authors = [
  {
    name: "Jamshid",
    age: 20,
    id: "1",
  },
  {
    name: "Mironshoh",
    age: 20,
    id: "2",
  },
  { name: "Umid", age: 20, id: "3" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, age) {
        return lodash.find(authors, { id: this.args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
