const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const {movieId} = request.params;
  try {
    const data = await service.read(movieId);

    if (data) {
      response.locals.movie = data;
      return next();
    } else {
      next({
        status: 404,
        message: `Movie cannot be found.`
      })
    }
  } catch (e){
    next(e);
  }
}

async function read(request, response) {
  await response.json({data: response.locals.movie});
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
