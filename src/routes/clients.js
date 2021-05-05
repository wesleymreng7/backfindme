const express = require("express");

const clientsController = require("../controllers/clients");

const clientsRouter = ({ Clients }) => {
  const router = express.Router();
  router.post("/", clientsController.create.bind(null, { Clients }));
  router.get("/", clientsController.getAll.bind(null, { Clients }));
  router.delete("/:clientId", clientsController.deleteOne.bind(null, { Clients }));
  router.put("/:clientId", clientsController.update.bind(null, { Clients }));

  return router;
};

module.exports = clientsRouter;
