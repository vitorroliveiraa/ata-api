import { query } from '../db';

const createTable = async () => {

  const announcementsTable = `
    CREATE TABLE Announcements (
      id SERIAL PRIMARY KEY,
      idSacrament INT REFERENCES SacramentMeeting(id),
      announcement TEXT
    );
  `;

  query(announcementsTable)
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