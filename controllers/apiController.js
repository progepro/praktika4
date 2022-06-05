var config = require("../config");
var pgp = require("pg-promise")();
var db = pgp(config.getDbConnectionString());
module.exports = function (app) {
  app.get("/api/rooms", function (req, res) {
    db.any("SELECT DISTINCT room FROM controller_sensor")
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          description: "Can’t find any room",
          error: err,
        });
      });
  });
  app.get("/api/room/:number/sensors", function (req, res) {
    db.any(
      "SELECT sensor.sensorname FROM sensor INNER JOIN controller_sensor ON controller_sensor.id_sensor=sensor.id " +
        "WHERE controller_sensor.room=" +
        req.params.number +
        ":: varchar"
    )
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch(function (err) {
        return next(err);
      });
  });
  app.get("/api/controllers", function (req, res) {
    db.any("SELECT controllername FROM controller")
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          description: "Can’t find any controller",
          error: err,
        });
      });
  });
  app.get("/api/sensors", function (req, res) {
    db.any(
      "select * from public.controller_sensor inner join controller ON controller_sensor.id_controller=controller.id"
    )
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          description: "Can’t find any controller",
          error: err,
        });
      });
  });
  app.get("/api/44/sensors", function (req, res) {
    db.any(
      "SELECT * from public.data_archive where room = '44' and data_archive.date_time = '2022-05-12 00:00:00'"
    )
      .then(function (data) {
        res.json({
          status: "success",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          description: "Can’t find any controller",
          error: err,
        });
      });
  });
};
