const express = require('express');
const app = express();
app.use(express.json());
const morgan = require("morgan");
const cors = require('cors')
app.use(cors())
app.use(morgan("tiny"));

// app.use(morgan({format: 'POST body length in bytes :req[Content-Length]', immediate: true}))
morgan.token('body', (req, res) => JSON.stringify(req.body));
morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]');


let phoneBook = [
    {
      id: 1,
      name: "shira",
      number: "0502075758",
    },
    {
      id: 2,
      name: "noa",
      number: "0502075759",
    },
    {
      id: 3,
      name: "tamar",
      number: "0502052272",
    },
    {
      id: 4,
      name: "amichay",
      number: "0508946244",
    },
  ];
//GET to the main page
  app.get('/api/persons', (request, response) => {
    response.json(phoneBook);
  })
//GET to info
app.get("/info", (request, response) => {
  response.send(`PhoneBook has info for ${phoneBook.length} people <br> ${new Date()}`)
})
//GET for ID
app.get("/api/persons/:id", (request, response) => {
const id = Number(request.params.id);
const person = phoneBook.find(person => person.id === id);
if (person) {
response.json(person);
} else {
  response.status(404).end()
}
})
//DELETE by ID
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
   phoneBook = phoneBook.filter(person => person.id !== id)

   response.status(204).end()
})

function genarateId (min ,max) {
return Math.floor(Math.random() * (max- min) + min)
}
//POST a new person
app.post("/api/persons", (request, response) => {
  const body = request.body;

if(!body) {
  return response.status(400).json({error: "content missing"})
}
if(!body.name) {
  return response.status(400).json({error: "name missing"})
}
if(phoneBook.find((person) => person.name === body.name))
{
  return response.status(400).json({error: "name has to be unique"})
}
if(!body.number) {
  return response.status(400).json({error: "number missing"})
}

const person = {
  id: generateId(phoneBook ,10000),
  name: body.name,
  number: body.number, 
}
phoneBook = phoneBook.concat(person)
response.json(person)
})

  const PORT =process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  const unknownEndpoint = (request, reponse) => {
    reponse.status(404).send({error: " unknown endpoint"})
  }
  app.use(unknownEndpoint)


  module.exports = app