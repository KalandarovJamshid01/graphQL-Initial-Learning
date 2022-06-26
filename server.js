const express = require("express");
const expressGraphQl = require("express-graphql");
const graphql = require("graphql");
const app = express();

const { GraphQlSchema, GraphQlObjectType } = require("graphql");
const schema = new GraphQlSchema({
  query: new GraphQlObjectType({
    name: "Hello world",
  }),
});

app.use(
  "/graphql",
  expressGraphQl({
    graphiql: true,
  })
);
app.listen(5000, () => {
  console.log("5000ci port iwladi");
});
