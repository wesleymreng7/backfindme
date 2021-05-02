const express = require("express");

const contributorsController = require("../controllers/contributors");

const clientsRouter = ({ Contributors }) => {
  const router = express.Router();
  router.post("/", contributorsController.create.bind(null, { Contributors }));

  return router;
};

module.exports = clientsRouter;
