const express = require("express");
const bodyParser = require("body-parser");
const elasticClient = require("./elastic-client");
require("express-async-errors");
var cors = require('cors')

const app = express();

const PORT = 3000

app.use(bodyParser.json());

app.use(cors())

// Express routes

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.redirect("http://localhost:3000/");
});


app.post("/create-user", async (req, res) => {
    console.log(req)
    const result = await elasticClient.index({
        index: "users",
        document: {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        },
        refresh: true
    });
    res.send(result);
});

app.post("/bulk-create-users", async (req, res) => {
  const body = req.body.users.flatMap((doc) => [
    { index: { _index: "users"} },
    doc,
  ]);
  const bulkResponse = await elasticClient.bulk({
    refresh: true,
    body,
  });
    res.send(bulkResponse);
    const count = await client.count({ index: 'users' })
    console.log(count)
});

app.delete("/delete-user", async (req, res) => {
    const result = await elasticClient.delete({
        index: "users",
        id: req.query.id
    });
    res.send(result);
});


app.get("/search", async (req, res) => {
const result = await elasticClient.search({
    index: "users",
    query: {
        query_string: {
            query: "*"+req.query.query+"*",
            default_field: "name",
        }
    },
});

res.json(result);
});

app.get("/users", async (req, res) => {
const result = await elasticClient.search({
    index: "users",
    query: { match_all: {} },
});

res.send(result);
});