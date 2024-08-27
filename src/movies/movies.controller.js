const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const {movieId} = request.params;
  const data = service.read(movieId)

  next({});
}

async function read(request, response) {

  response.json({ data: "" });
}

async function list(request, response) {
  const {is_showing} = request.query
  const data = await service.list(is_showing)

  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
