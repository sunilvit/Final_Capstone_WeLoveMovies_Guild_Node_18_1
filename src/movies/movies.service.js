const knex = require("../db/connection");

/*
Function to list movies which are currently showing in theaters.
 */
async function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

/*
Function to read specific MovieId
 */
async function read(movie_id) {
  return knex("movies")
      .select("*")
      .where({movie_id: movie_id})
      .first();
}

module.exports = {
  list,
  read,
};
