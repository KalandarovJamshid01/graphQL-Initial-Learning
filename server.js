const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema");
const { graphqlHTTP } = require("express-graphql");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Jamshid:jamshid01@cluster0.3llz0fb.mongodb.net/graphQL?retryWrites=true&w=majority",
    {}
  )
  .then(() => {
    console.log("DB connected");
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(5000, () => {
  console.log("5000ci port iwladi");
});
