const express = require("express");

const clientsController = require("../controllers/clients");

const clientsRouter = ({ Clients }) => {
  const router = express.Router();
  router.post("/", clientsController.create.bind(null, { Clients }));

  return router;
};

module.exports = clientsRouter;
