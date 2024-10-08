const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

async function listTheatersWithMovie(movieId) {
  return knex("theaters")
    .join(
      "movies_theaters",
      "movies_theaters.theater_id",
      "theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
      .where({"movies.movie_id": movieId})
    .then(reduceMovies);
}

async function list(){
  return knex("theaters")
      .join(
          "movies_theaters",
          "movies_theaters.theater_id",
          "theaters.theater_id"
      )
      .join("movies", "movies.movie_id", "movies_theaters.movie_id")
      .then(reduceMovies);
}

module.exports = {
  listTheatersWithMovie,
  list
};
