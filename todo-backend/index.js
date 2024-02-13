var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');

var app = Express();
app.use(cors());
app.use(Express.json());

const CONNECTION_STRING = "YOUR_URL_GOES_HERE";

const DATABASE_NAME = "todoappdb";

var database;

app.listen(80, () => {
 MongoClient.connect(CONNECTION_STRING, (error, client) => {
  if (error) {
   throw error;
  }
  database = client.db(DATABASE_NAME);
  console.log("Connected to `" + DATABASE_NAME + "`!");
 });
});

app.get('/api/todoapp/GetNotes', (req, res) => {
 database.collection("todoappcollection").find({}).toArray((error, result) => {
  if (error) {
   return res.status(500).send();
  }
  res.send(result);
 });
});

app.post('/api/todoapp/AddNotes', (req, res) => {
 database.collection("todoappcollection").count({}, function (error, numOfDocs) {
  if (error) {
   return res.sendStatus(500);
  }

  console.log(req.body);

  database.collection("todoappcollection").insertOne({
   id: (numOfDocs + 1).toString(),
   description: req.body.description,
  });

  res.status(201).send({ id: numOfDocs + 1, description: req.body.description });
 });
});

app.delete('/api/todoapp/DeleteNotes/:id', (req, res) => {
 database.collection("todoappcollection").deleteOne({ id: req.params.id });

 res.status(200).json("Successfully deleted the note with id " + req.params.id);
});