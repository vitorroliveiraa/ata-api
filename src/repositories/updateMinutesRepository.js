import { query } from '../database/db.js';
import minutesRepository from './getMinutesByIdRepository.js';
import { arraysEqual, testimoniesEqual, sustainingAndReleasingEqual, announcementsEqual } from '../shared/utils/utils.js';

const updateMinutesById = async (id, newMinutes) => {
	try {
		const currentMinutes = await minutesRepository.getMinutesById(id);

		if (newMinutes.sacramentMeeting.date !== currentMinutes.sacramentMeeting.date) currentMinutes.sacramentMeeting.date = newMinutes.sacramentMeeting.date;
		if (newMinutes.sacramentMeeting.attendance !== currentMinutes.sacramentMeeting.attendance) currentMinutes.sacramentMeeting.attendance = newMinutes.sacramentMeeting.attendance;
		if (newMinutes.sacramentMeeting.chairedby !== currentMinutes.sacramentMeeting.chairedby) currentMinutes.sacramentMeeting.chairedby = newMinutes.sacramentMeeting.chairedby;
		if (newMinutes.sacramentMeeting.headedby !== currentMinutes.sacramentMeeting.headedby) currentMinutes.sacramentMeeting.headedby = newMinutes.sacramentMeeting.headedby;
		if (!arraysEqual(newMinutes.sacramentMeeting.authorities, currentMinutes.sacramentMeeting.authorities)) currentMinutes.sacramentMeeting.authorities = newMinutes.sacramentMeeting.authorities.slice();
		if (!arraysEqual(newMinutes.sacramentMeeting.visitors, currentMinutes.sacramentMeeting.visitors)) currentMinutes.sacramentMeeting.visitors = newMinutes.sacramentMeeting.visitors.slice();
		if (newMinutes.sacramentMeeting.regent !== currentMinutes.sacramentMeeting.regent) currentMinutes.sacramentMeeting.regent = newMinutes.sacramentMeeting.regent;
		if (newMinutes.sacramentMeeting.organ !== currentMinutes.sacramentMeeting.organ) currentMinutes.sacramentMeeting.organ = newMinutes.sacramentMeeting.organ;
		if (newMinutes.sacramentMeeting.firsthymn !== currentMinutes.sacramentMeeting.firsthymn) currentMinutes.sacramentMeeting.firsthymn = newMinutes.sacramentMeeting.firsthymn;
		if (newMinutes.sacramentMeeting.firstprayer !== currentMinutes.sacramentMeeting.firstprayer) currentMinutes.sacramentMeeting.firstprayer = newMinutes.sacramentMeeting.firstprayer;
		if (newMinutes.sacramentMeeting.sacramenthymn !== currentMinutes.sacramentMeeting.sacramenthymn) currentMinutes.sacramentMeeting.sacramenthymn = newMinutes.sacramentMeeting.sacramenthymn;
		if (newMinutes.sacramentMeeting.firstspeaker !== currentMinutes.sacramentMeeting.firstspeaker) currentMinutes.sacramentMeeting.firstspeaker = newMinutes.sacramentMeeting.firstspeaker;
		if (newMinutes.sacramentMeeting.secondspeaker !== currentMinutes.sacramentMeeting.secondspeaker) currentMinutes.sacramentMeeting.secondspeaker = newMinutes.sacramentMeeting.secondspeaker;
		if (newMinutes.sacramentMeeting.specialhymn !== currentMinutes.sacramentMeeting.specialhymn) currentMinutes.sacramentMeeting.specialhymn = newMinutes.sacramentMeeting.specialhymn;
		if (newMinutes.sacramentMeeting.thirdspeaker !== currentMinutes.sacramentMeeting.thirdspeaker) currentMinutes.sacramentMeeting.thirdspeaker = newMinutes.sacramentMeeting.thirdspeaker;
		if (newMinutes.sacramentMeeting.lasthymn !== currentMinutes.sacramentMeeting.lasthymn) currentMinutes.sacramentMeeting.lasthymn = newMinutes.sacramentMeeting.lasthymn;
		if (newMinutes.sacramentMeeting.lastprayer !== currentMinutes.sacramentMeeting.lastprayer) currentMinutes.sacramentMeeting.lastprayer = newMinutes.sacramentMeeting.lastprayer;
		if (newMinutes.sacramentMeeting.observations !== currentMinutes.sacramentMeeting.observations) currentMinutes.sacramentMeeting.observations = newMinutes.sacramentMeeting.observations;

		if (!testimoniesEqual(newMinutes.testimonies, currentMinutes.testimonies)) currentMinutes.testimonies = newMinutes.testimonies.slice();
		if (!sustainingAndReleasingEqual(newMinutes.sustainingAndReleasing, currentMinutes.sustainingAndReleasing)) currentMinutes.sustainingAndReleasing = newMinutes.sustainingAndReleasing.slice();
		if (!announcementsEqual(newMinutes.announcements, currentMinutes.announcements)) currentMinutes.announcements = newMinutes.announcements.slice();

		await query(`
			UPDATE
				SacramentMeeting 
			SET
				date = $1, attendance = $2, chairedBy = $3, headedBy = $4, authorities = $5, visitors = $6, regent = $7, organ = $8, firstHymn = $9, firstPrayer = $10,
				sacramentHymn = $11, firstSpeaker = $12, secondSpeaker = $13, specialHymn = $14, thirdSpeaker = $15, lastHymn = $16, lastPrayer = $17, observations = $18
			WHERE
				id = $19`,
			[
				currentMinutes.sacramentMeeting.date, currentMinutes.sacramentMeeting.attendance, currentMinutes.sacramentMeeting.chairedby,
				currentMinutes.sacramentMeeting.headedby, currentMinutes.sacramentMeeting.authorities, currentMinutes.sacramentMeeting.visitors,
				currentMinutes.sacramentMeeting.regent, currentMinutes.sacramentMeeting.organ, currentMinutes.sacramentMeeting.firsthymn,
				currentMinutes.sacramentMeeting.firstprayer, currentMinutes.sacramentMeeting.sacramenthymn, currentMinutes.sacramentMeeting.firstspeaker,
				currentMinutes.sacramentMeeting.secondspeaker, currentMinutes.sacramentMeeting.specialhymn, currentMinutes.sacramentMeeting.thirdspeaker,
				currentMinutes.sacramentMeeting.lasthymn, currentMinutes.sacramentMeeting.lastprayer, currentMinutes.sacramentMeeting.observations,
				id
			]
		);

	} catch (error) {
		console.log('Error update minutes: ', error);
		throw new AppError(`🚨 Error update minutes: ${error}`);
	}
}

export default {
	updateMinutesById
};