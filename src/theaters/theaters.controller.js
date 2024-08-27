const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const {movieId} = request.params;
  if (movieId){
    const data = await service.listTheatersWithMovie(movieId);
    response.json({data});
  }else {
    const theaters = await service.list();
    response.json({data: theaters});
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
