const express = require("express");

const contributorsController = require("../controllers/contributors");

const contributorsRouter = ({ Contributors }) => {
  const router = express.Router();
  router.post("/", contributorsController.create.bind(null, { Contributors }));
  router.post("/login", contributorsController.login.bind(null, { Contributors }));
  router.get("/last", contributorsController.getLastOs.bind(null, { Contributors }));

  return router;
};

module.exports = contributorsRouter;
