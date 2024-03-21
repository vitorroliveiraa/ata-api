import { query } from '../database/db.js';
import { AppError } from '../shared/middlewares/errorMiddleware.js';

const getMinutesById = async (id) => {
  let minutes = {}; // TODO Procurar saber porque nesse caso não deu erro atribuindo valores a uma const

  const sacramentMeetingRaw = await query(`SELECT * FROM SacramentMeeting WHERE id = $1`, [id]);
  if (!sacramentMeetingRaw.rowCount) throw new AppError('Minutes not found!', 404);
  minutes.sacramentMeeting = sacramentMeetingRaw.rows[0];
  
  const testimoniesRaw = await query(`SELECT * FROM Testimonies WHERE idSacrament = $1`, [id]);
  minutes.testimonies = testimoniesRaw.rows.length > 0 ? testimoniesRaw.rows : null;

  const sustainingAndReleasingRaw = await query(`SELECT * FROM SustainingAndReleasing WHERE idSacrament = $1`, [id]);
  minutes.sustainingAndReleasing = sustainingAndReleasingRaw.rows.length > 0 ? sustainingAndReleasingRaw.rows : null;

  const announcementsRaw = await query(`SELECT * FROM Announcements WHERE idSacrament = $1`, [id]);
  minutes.announcements = announcementsRaw.rows.length > 0 ? announcementsRaw.rows : null;

  return minutes;
};

export default { getMinutesById };