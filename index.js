const express = require('express')
const app = express()
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

  app.get('/api/persons', (request, response) => {
    response.json(phoneBook);
  })

app.get("/info", (request, response) => {
  response.send(`PhoneBook has info for ${phoneBook.length} people <br> ${new Date()}`)
})

app.get("/api/persons/:id", (request, response) => {
const id = Number(request.params.id);
const person = phoneBook.find(person => person.id === id);
if (person) {
response.json(person);
} else {
  response.status(404).end()
}
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
   phoneBook = phoneBook.filter(person => person.id !== id)

   response.status(204).end()
})


  const PORT = 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)

  