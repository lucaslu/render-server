/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("educators").del();
  await knex("educators").insert([
    {
      id: "d9dd16a6-4787-4a2c-80e5-976bbc19a430",
      name: "Nooruddin Khorasi",
      position: "Lead Educator & Team Lead",
      email: "noor.k@email.com",
    },
    {
      id: "e535a873-59e3-4256-9db2-dcf7f0d7b633",
      name: "André Foulem",
      position: "Teaching Assistant",
      email: "andre.f@email.com",
    },
    {
      id: "349bd351-3f36-425e-b8ef-11585df724bd",
      name: "Kayle Robson",
      position: "Teaching Assistant",
      email: "kayle.r@email.com",
    },
    {
      id: "2c0d90bd-558e-4991-b31a-7d55e162a45d",
      name: "Ragib Sina",
      position: "Teaching Assistant",
      email: "ragib.s@email.com",
    },
  ]);
};
