const express = require("express");
const { checkAuth, validateBody, isValidId } = require("../middlewares");
const { createSchema, updateSchema } = require("../validate_schemas");
const { errorCatcher } = require("../utils");
const { add, getAll, getById, update, remove } = require("../controllers");

const router = express.Router();

router.get("/", checkAuth, errorCatcher(getAll));

router.get("/:movieId", checkAuth, isValidId, errorCatcher(getById));

router.post("/", checkAuth, validateBody(createSchema), errorCatcher(add));

router.patch(
  "/:movieId",
  checkAuth,
  isValidId,
  validateBody(updateSchema),
  errorCatcher(update)
);

router.delete("/:movieId", checkAuth, isValidId, errorCatcher(remove));

module.exports = router;
