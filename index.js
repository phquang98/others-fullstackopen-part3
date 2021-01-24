// import express from "express";
// const app = express();

// app.use(express.json());

// let notes = [
//   { id: 1, content: "HTML is easy", date: "2019-05-30T17:30:31.098Z", important: true },
//   { id: 2, content: "Browser can execute only Javascript", date: "2019-05-30T18:39:34.091Z", important: false },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => note.id === id);
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

// app.post("/api/notes", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//     id: generateId(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

import express from "express";
import morgan from "morgan";
import cors from "cors";

import { generateRes } from "./helpers/info.js";
import { deleteId, generateIdRes, validateReqBody } from "./helpers/api_persons.js";

const app = express();

app.use(express.json()); // make everything in the req body to becomed jsonable
app.use(morgan("tiny")); // using the logging middleware
app.use(cors());
app.use(express.static("build")); // serves the build folder of fe

let db = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
  { id: 5, name: "Johnny Bravo", number: "099-888-777666555" },
  { id: 6, name: "Sherlock Holmes", number: "221-12345678" },
];

app.get("/api/persons/:idHere", (request, response) => {
  console.log("the id is:", request.params.idHere);
  // very bad logic code here
  if (request.params.idHere >= 5) {
    response.status(404).send(generateIdRes(request.params.idHere, db));
  } else {
    response.status(200).send(generateIdRes(request.params.idHere, db));
  }
});

app.delete("/api/persons/:idHere", (req, res) => {
  console.log("deleting item id:", req.params.idHere);
  db = deleteId(req.params.idHere, db);
  res.status(204).end();
});

app.get("/api/persons", (request, response) => {
  response.json(db);
});

// very lazy + bad logic code
app.post("/api/persons", (req, res) => {
  // console.log(req.body.name);
  console.log(validateReqBody(req.body, db));
  const newEntry = {
    id: Math.floor(Math.random() * 50),
    name: req.body.name,
    number: req.body.number,
  };
  db = [...db, newEntry];
  res.status(201).send("Created successful!");
});

app.get("/info", (request, response) => {
  response.send(generateRes(db));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
