import { query } from '../db';

const createTable = async () => {

  const testimoniesTable = `
    CREATE TABLE Testimonies (
      id SERIAL PRIMARY KEY,
      idSacrament INT REFERENCES SacramentMeeting(id),
      name VARCHAR(255)
    );
  `;

  query(testimoniesTable)
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