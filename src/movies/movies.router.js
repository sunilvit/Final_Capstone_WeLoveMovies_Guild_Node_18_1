const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId([0-9]+)")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;
