const router = require("express").Router();
const studentsController = require("../controllers/studentsController");

router.route("/").get(studentsController.findAll).post(studentsController.add);

router
  .route("/:id")
  .get(studentsController.findOne)
  .patch(studentsController.update)
  .delete(studentsController.remove);

module.exports = router;
