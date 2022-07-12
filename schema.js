const graphql = require("graphql");
const lodash = require("lodash");

const Book = require("./models/bookModel");
const Author = require("./models/authorModel");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const books = [
//   { name: "kitob", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "kniga", genre: "Fantasy", authorId: "2", id: "2" },
//   { name: "Book", genre: "fantasy", id: "3", authorId: "3" },
//   { name: "Boook2", genre: "fantasy", id: "5", authorId: "2" },
//   { name: "Boook3", genre: "fantasy", id: "5", authorId: "3" },
//   { name: "Book3", genre: "fantasy", id: "5", authorId: "3" },
// ];
// const authors = [
//   { name: "Jamshid", age: 20, id: "1" },
//   { name: "Mironshoh", age: 20, id: "2" },
//   { name: "Umid", age: 20, id: "3" },
// ];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return lodash.filter(books, { authorId: parent.id });
      },
    },
  }),
});
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return lodash.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return lodash.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return lodash.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, age) {
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
