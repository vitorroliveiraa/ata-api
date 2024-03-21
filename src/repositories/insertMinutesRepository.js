import { getClient } from '../database/db.js';
import { AppError } from '../shared/middlewares/errorMiddleware.js';

const insertMinutes = async (sacramentMeeting, testimonies, sustainingAndReleasing, announcements) => {

  const client = await getClient();

  try {
    await client.query('BEGIN');

    const result = await client.query(`
      INSERT INTO SacramentMeeting (date, attendance, chairedBy, headedBy, authorities, visitors, regent, organ, firstHymn, firstPrayer, sacramentHymn, firstSpeaker, secondSpeaker, specialHymn, thirdSpeaker, lastHymn, lastPrayer, observations)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING id`,
      [sacramentMeeting.date, sacramentMeeting.attendance, sacramentMeeting.chairedby, sacramentMeeting.headedby, sacramentMeeting.authorities, sacramentMeeting.visitors, sacramentMeeting.regent, sacramentMeeting.organ, sacramentMeeting.firsthymn, sacramentMeeting.firstprayer, sacramentMeeting.sacramenthymn, sacramentMeeting.firstspeaker, sacramentMeeting.secondspeaker, sacramentMeeting.specialhymn, sacramentMeeting.thirdspeaker, sacramentMeeting.lasthymn, sacramentMeeting.lastprayer, sacramentMeeting.observations]
    );

    const idSacrament = result.rows[0].id;

    if (testimonies && testimonies.length > 0) {
      const values = testimonies.map(item => `('${item.name}', ${idSacrament})`).join(', ');
      await client.query(`INSERT INTO Testimonies (name, idSacrament) VALUES ${values}`);
    }

    if (sustainingAndReleasing && sustainingAndReleasing.length > 0) {
      const values = sustainingAndReleasing.map(item => `('${item.name}', '${item.called}', ${idSacrament})`).join(', ');
      await client.query(`INSERT INTO SustainingAndReleasing (name, called, idSacrament) VALUES ${values}`);
    }

    if (announcements && announcements.length > 0) {
      const values = announcements.map(item => `('${item.announcement.replace(/'/g, "''")}', ${idSacrament})`).join(', ');
      await client.query(`INSERT INTO Announcements (announcement, idSacrament) VALUES ${values}`);
    }

    await client.query('COMMIT');

  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error inserting minutes: ', error);
    throw new AppError(`🚨 Error inserting minutes: ${error}`);

  } finally {
    client.release();
  }
};

export default {
  insertMinutes
};
