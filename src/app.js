const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4")

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repo)

  return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  const { title, techs, url } = request.body
  const { id } = request.params

  const repoIndex = repositories.findIndex(r => r.id === id)

  if(repoIndex === -1 ) {
    return response.status(400).json({error: "Repository doed not exists!"})
  }

  const newInfoRepo = {
    id,
    title, 
    techs,
    url,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = newInfoRepo

  return response.json(newInfoRepo)

 });

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(r => r.id === id)

  if(repoIndex < 0 ) {
    return response.status(400).json({error: "this repository not exists!"})
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repoIndex = repositories.findIndex(r => r.id === id)

  if(repoIndex < 0 ) {
    return response.status(400).json({error: "this repository not exists!"})
  }

  const repo = repositories[repoIndex]

  repo.likes++

  return response.json(repositories[repoIndex])
});

module.exports = app;
