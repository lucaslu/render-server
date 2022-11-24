const { v4: uuidv4 } = require("uuid");
const env = process.env.NODE_ENV || "development";
const knex = require("knex")(require("../knexfile")[env]);

const findAll = (_req, res) => {
  knex("students")
    // .select("id", "name", "course", "email", "educator_id")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Students: ${err}`));
};

const findOne = (req, res) => {
  knex("students")
    .where({ id: req.params.id })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        res.status(404).send(`Student with id: ${req.params.id} is not found`);
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving Student with ID: ${req.params.id} ${err}`)
    );
};

const add = (req, res) => {
  // Validate the request body for required data
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.course ||
    !req.body.educator_id
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide name, course, educator_id and email fields in the request"
      );
  }

  const newStudentId = uuidv4();
  knex("students")
    .insert({ ...req.body, id: newStudentId })
    .then((_data) => {
      knex("students")
        .where({ id: newStudentId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating Student: ${err}`));
};

const update = async (req, res) => {
  knex("students")
    .where({ id: req.params.id })
    .update(req.body)
    .then((_data) => {
      knex("students")
        .where({ id: req.params.id })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error updating Student with ID: ${req.params.id} ${err}`)
    );
};

const remove = async (req, res) => {
  knex("students")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(200).json({
        deletedStudentId: req.params.id,
      });
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error deleting Student with ID: ${req.params.id} ${err}`)
    );
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  remove,
};
