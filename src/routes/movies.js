const express = require("express");
const { checkAuth, validateBody, isValidId } = require("../middlewares");
const { createSchema, updateSchema } = require("../validate_schemas");
const { errorCatcher } = require("../utils");
const { add, getAll, getById, update, remove } = require("../controllers");

const router = express.Router();

router
  .route("/")
  .get(errorCatcher(getAll))
  .post(validateBody(createSchema), errorCatcher(add));

router
  .route("/:movieId")
  .get(isValidId, errorCatcher(getById))
  .patch(isValidId, validateBody(updateSchema), errorCatcher(update))
  .delete(isValidId, errorCatcher(remove));

module.exports = router;
