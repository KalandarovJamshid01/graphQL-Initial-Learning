const express = require("express");
const mongoose = require("mongoose");
const schema = require("./schema");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


mongoose
  .connect(process.env.MONGO_DB, {})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
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
