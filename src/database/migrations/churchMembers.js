import { query } from '../db';

const createTable = async () => {

  const churchMembersTable = `
  CREATE TABLE Church_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300)
  )`;

  query(churchMembersTable)
    .then((res) => {
      console.log('SQL executed successfully!');
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(0);
    });
};

createTable();