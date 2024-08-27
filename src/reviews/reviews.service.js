const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritics = reduceProperties("review_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  created_at: ["critic", "created_at"],
  updated_at: ["critic", "updated_at"]
});

const tableName = "reviews";

async function destroy(reviewId) {
  return knex(tableName)
      .where({review_id: reviewId})
      .del();
}

async function list(movie_id) {
  return knex("reviews as r")
      .select("*")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .where({movie_id: movie_id})
      .then(reduceCritics);
}

async function read(reviewId) {
  return knex(tableName)
      .select("*")
      .where({review_id: reviewId})
      .first();
  
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex(tableName).select("*")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
