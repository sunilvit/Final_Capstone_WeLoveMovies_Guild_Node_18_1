const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const {reviewId} = request.params;
  const data = await service.read(reviewId);
  if (!data){
    next({
      status: 404,
      message: `Review cannot be found.`
    })
  }else {
    next();
  }
}

async function destroy(request, response) {
  const {reviewId} = request.params;
  await service.destroy(reviewId);
  response.sendStatus(204);
}

async function list(request, response) {
  const {movieId} = request.params;
  const data = await service.list(movieId);
  response.json({ data });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const {reviewId} = request.params;
  const updatedReview = {
    ...request.body.data,
    review_id: reviewId
  }
  const data = await service.update(updatedReview);
  response.json({data});
}


// async function read(req, res, next){
//   const {reviewId} = req.params;
//   const data = await service.read(reviewId);
//
//   res.json({data});
// }

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
  // read
};
