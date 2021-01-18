const router = require("express").Router();
const Jeepney = require("../models/Jeepney");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/search_all_jeepneys", (req, res) => {
  Jeepney.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/search_jeepneys", (req, res) => {
  let { value } = req.body;

  Jeepney.findAll({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.like]: value,
          },
        },
        {
          driverId: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          plateNumber: {
            [Op.like]: "%" + value + "%",
          },
        },
        {
          jeepCapacity: {
            [Op.like]: "%" + value + "%",
          },
        },
      ],
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/add_jeep", (req, res) => {
  console.log("add to jeep table");
  let { driverId, plateNumber, jeepCapacity } = req.body;

  Jeepney.create({ driverId, plateNumber, jeepCapacity })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_jeep", (req, res) => {
  let { id } = req.query;

  Jeepney.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted jeepney" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
