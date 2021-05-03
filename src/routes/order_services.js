const express = require("express");
const auth = require('../utils/auth')

const orderServicesController = require("../controllers/order_services");

const OSRouter = ({ OrderServices }) => {
  const router = express.Router();
  router.post("/", auth.verifyToken, orderServicesController.create.bind(null, { OrderServices }));
  router.get("/all/:currentPage/:pageSize", orderServicesController.getAll.bind(null, { OrderServices }));
  router.get("/month", orderServicesController.getByMonth.bind(null, { OrderServices }));

  return router;
};

module.exports = OSRouter;
