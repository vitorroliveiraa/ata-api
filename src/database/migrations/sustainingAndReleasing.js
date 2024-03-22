import { query } from '../db';

export const createTable = async () => {

  const sustainingAndReleasingTable = `
    CREATE TABLE SustainingAndReleasing (
      id SERIAL PRIMARY KEY,
      idSacrament INT REFERENCES SacramentMeeting(id),
      name VARCHAR(255),
      called VARCHAR(255)
    );
  `;

  query(sustainingAndReleasingTable)
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