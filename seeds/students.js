/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("students").del();
  await knex("students").insert([
    {
      id: "fadf8344-79f6-4776-9328-27b3d3af5a00",
      name: "John Doe",
      course: "Web Development",
      email: "john.d@email.com",
      educator_id: "e535a873-59e3-4256-9db2-dcf7f0d7b633",
    },
    {
      id: "c088e331-b01a-43b5-ab1d-5ba16e30b070",
      name: "Jose Thomas ",
      course: "Web Development",
      email: "jose.t@email.com",
      educator_id: "349bd351-3f36-425e-b8ef-11585df724bd",
    },
    {
      id: "25e38275-20d1-498b-9d13-9cb3c6e4aefc",
      name: "Vivian Sanchez",
      course: "Web Development",
      email: "vivian.s@email.com",
      educator_id: "2c0d90bd-558e-4991-b31a-7d55e162a45d",
    },
    {
      id: "0da51abf-a78b-44b4-9fd9-410165cfd529",
      name: "Kimberly Johnson",
      course: "Web Development",
      email: "kimberly.j@email.com",
      educator_id: "d9dd16a6-4787-4a2c-80e5-976bbc19a430",
    },
    {
      id: "65f8b1c8-24fc-47aa-b9a6-1010670cd525",
      name: "David Robbinson ",
      course: "Web Development",
      email: "david.r@email.com",
      educator_id: "e535a873-59e3-4256-9db2-dcf7f0d7b633",
    },
    {
      id: "baf8d9ec-6496-4643-8f34-566721cca397",
      name: "Mary Noble",
      course: "Web Development",
      email: "mary.n@email.com",
      educator_id: "d9dd16a6-4787-4a2c-80e5-976bbc19a430",
    },
  ]);
};
