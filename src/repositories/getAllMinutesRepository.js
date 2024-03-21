import { query } from '../database/db.js';

const getAllMinutes = async (page, limit) => {
	const offset = (page - 1) * limit;

	const sacramentMeetingQuery = `
    SELECT * FROM SacramentMeeting ORDER BY id LIMIT $1 OFFSET $2
  `;
	const { rows: sacramentMeetingData } = await query(sacramentMeetingQuery, [limit, offset]);

	const testimoniesQuery = `
		SELECT * FROM Testimonies WHERE idSacrament = $1
	`;
	const sustainingAndReleasingQuery = `
		SELECT * FROM SustainingAndReleasing WHERE idSacrament = $1
	`;
	const announcementsQuery = `
		SELECT * FROM Announcements WHERE idSacrament = $1
	`;

	// for (const sacramentMeeting of sacramentMeetingData) {
	// 	let minutes = {};
	// 	const { rows: testimonies } = await query(testimoniesQuery, [sacramentMeeting.id]);
	// 	const { rows: sustainingAndReleasing } = await query(sustainingAndReleasingQuery, [sacramentMeeting.id]);
	// 	const { rows: announcements } = await query(announcementsQuery, [sacramentMeeting.id]);

	// 	sacramentMeeting.testimonies = testimonies;
	// 	sacramentMeeting.sustainingAndReleasing = sustainingAndReleasing;
	// 	sacramentMeeting.announcements = announcements;
	// }

	for (let i = 0; i < sacramentMeetingData.length; i++) {
		const { rows: testimonies } = await query(testimoniesQuery, [sacramentMeetingData[i].id]);
		const { rows: sustainingAndReleasing } = await query(sustainingAndReleasingQuery, [sacramentMeetingData[i].id]);
		const { rows: announcements } = await query(announcementsQuery, [sacramentMeetingData[i].id]);

		sacramentMeetingData[i] = {
			sacramentMeeting: sacramentMeetingData[i],
			testimonies: testimonies.length > 0 ? testimonies : null,
			sustainingAndReleasing: sustainingAndReleasing.length > 0 ? sustainingAndReleasing : null,
			announcements: announcements.length > 0 ? announcements : null
		};
	}

	const countQuery = `SELECT COUNT(*) FROM SacramentMeeting`;
	const { rows: [{ count }] } = await query(countQuery);

	const totalRecords = parseInt(count);
	const totalPages = Math.ceil(totalRecords / limit);

	return {
		data: sacramentMeetingData,
		meta: {
			currentPage: page,
			totalPages,
			totalRecords,
			perPage: limit,
		}
	};
};

export default { getAllMinutes };