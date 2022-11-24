const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile"));

const findAll = (_req, res) => {
  knex("educators")
    .then((educators) => {
      res.status(200).json(educators);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving educators ${err}`);
    });
};

const findOne = (req, res) => {
  knex("educators")
    .where({ id: req.params.id })
    .then((data) => {
      if (data.length === 0) {
         res
          .status(404)
          .send(`Error retrieving educator with ID: ${req.params.id} `);
      }

      // knex returns matched rows inside of an array.
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving educator ${err}`);
    });
};

/**
 * educators.id, name, position, email, educators.updated_at, students.id, name, email, course, educator_id, students.updated_at
 *
 */
const students = (req, res) => {
  knex("educators")
    .join("students", "students.educator_id", "educators.id")
    .where({ educator_id: req.params.id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving students for Educator with ID: ${req.params.id} ${err}`
        )
    );
};

const add = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.position) {
    return res
      .status(400)
      .send("Please provide name, position and email in the request");
  }

  const newEducatorId = uuidv4();
  knex("educators")
    .insert({ ...req.body, id: newEducatorId })
    .then((_data) => {
      // knex does not respond back with new row Id when adding entries
      // so we are maintaining our own uuid in server
      knex("educators")
        .where({ id: newEducatorId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating Educator: ${err}`));
};

const update = async (req, res) => {
  knex("educators")
    .where({ id: req.params.id })
    .update(req.body)
    .then((_data) => {
      knex("educators")
        .where({ id: req.params.id })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    });
};

const remove = async (req, res) => {
  // knex("educators")
  //   .where({ id: req.params.id })
  //   .del()
  //   .then(() => {
  //     // in Front End, if status code in response is 204, filter state using
  //     // params.id
  //     res.status(204)
  //   })
  //   .catch((err) =>
  //     res
  //       .status(400)
  //       .send(`Error deleting Educator with ID: ${req.params.id} ${err}`)
  //   );

  knex("educators")
    .where({ id: req.params.id })
    .del()
    .then(() => {
      res.status(200).json({ deletedStudentId: req.params.id });
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error deleting Educator with ID: ${req.params.id} ${err}`)
    );
};

module.exports = {
  findAll,
  findOne,
  students,
  add,
  update,
  remove,
};
