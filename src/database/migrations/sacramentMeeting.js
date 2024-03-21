import { query } from '../db.js';

const createTable = async () => {

	const sacramentMeetingTable = `
    CREATE TABLE SacramentMeeting (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      attendance SMALLINT NOT NULL,
      chairedBy VARCHAR(255) NOT NULL,
      headedBy VARCHAR(255) NOT NULL,
      authorities VARCHAR(510)[],
      visitors VARCHAR(510)[],
      regent VARCHAR(255),
      organ VARCHAR(255),
      firstHymn SMALLINT NOT NULL,
      firstPrayer VARCHAR(255) NOT NULL,
      sacramentHymn SMALLINT NOT NULL,
      firstSpeaker VARCHAR(255),
      secondSpeaker VARCHAR(255),
      specialHymn SMALLINT,
      thirdSpeaker VARCHAR(255),
      lastHymn SMALLINT NOT NULL,
      lastPrayer VARCHAR(255) NOT NULL,
      observations TEXT
  	);
  `;

	query(sacramentMeetingTable)
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