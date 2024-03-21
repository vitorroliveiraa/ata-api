import { body } from 'express-validator';

function createLocalDate(dateString) {
	const [year, month, day] = dateString.split('-');
	return new Date(year, month - 1, day);
}

function isFirstSunday(date) {
	return date.getDate() <= 7 && date.getDay() === 0;
}

export const dataValidation = [
	body('sacramentMeeting.date')
		.notEmpty().withMessage('The "date" is required.')
		.isISO8601().withMessage('The data must be in ISO 8601 format (YYYY-MM-DD).'),

	body('sacramentMeeting.attendance')
		.notEmpty().withMessage('The "attendance" is required.')
		.isNumeric().withMessage('The value must be numeric.'),

	body('sacramentMeeting.chairedby')
		.notEmpty().withMessage('The "chaired by" is missing.')
		.isString(),

	body('sacramentMeeting.headedby')
		.notEmpty().withMessage('The "headed by" is missing.')
		.isString().withMessage('The value must be text.'),

	body('sacramentMeeting.authorities')
		.isString().withMessage('The value must be text.'),

	body('sacramentMeeting.visitors')
		.isArray().withMessage('The value must be an array.')
		.custom((value) => {
			for (let item of value) {
				if (typeof item !== 'string') {
					throw new Error('All elements in the array must be strings.');
				}
			}
			return true;
		}),

	body('sacramentMeeting.regent')
		.isString().withMessage('The value must be text.'),

	body('sacramentMeeting.organ')
		.isString().withMessage('The value must be text.'),

	body('sacramentMeeting.firsthymn')
		.notEmpty().withMessage('The "first hymn" is missing.')
		.isNumeric().withMessage('The value must be numeric.'),

	body('sacramentMeeting.firstprayer')
		.notEmpty().withMessage('The "first prayer" is missing.')
		.isString().withMessage('The value must be text.'),

	body('sacramentMeeting.sacramenthymn')
		.notEmpty().withMessage('The "sacrament hymn" is missing.')
		.isNumeric().withMessage('The value must be numeric.'),

	body('sacramentMeeting.firstspeaker')
		.custom((value, { req }) => {
			if (isFirstSunday(createLocalDate(req.body.sacramentMeeting.date)) || value?.trim()) return true;

			throw new Error('The "third speaker" is missing.');
		}),

	body('sacramentMeeting.secondspeaker')
		.custom((value, { req }) => {
			if (isFirstSunday(createLocalDate(req.body.sacramentMeeting.date)) || value?.trim()) return true;

			throw new Error('The "second speaker" is missing.');
		}),

	body('sacramentMeeting.specialhymn')
		.isNumeric().withMessage('The value must be numeric.'),

	body('sacramentMeeting.thirdspeaker')
		.custom((value, { req }) => {
			if (isFirstSunday(createLocalDate(req.body.sacramentMeeting.date)) || value?.trim()) return true;

			throw new Error('The "third speaker" is missing.');
		}),

	body('sacramentMeeting.lasthymn')
		.notEmpty().withMessage('The "last hymn" is missing.')
		.isNumeric().withMessage('The value must be numeric.'),

	body('sacramentMeeting.lastprayer')
		.notEmpty().withMessage('The "last prayer" is missing.')
		.isString().withMessage('The value must be text.'),

	body('sacramentMeeting.observations')
		.isString().withMessage('The value must be text.'),

	body('testimonies')
		.custom((array) => array === null || (Array.isArray(array) && array.every((item) => typeof item === 'object' && typeof item.name === 'string')))
		.withMessage('The value must be string array.'),

	body('sustainingAndReleasing')
		.custom((array) => array === null || (Array.isArray(array) && array.every((item) => typeof item === 'object' && typeof item.name === 'string' && typeof item.called === 'string')))
		.withMessage('The value must be string array.'),

	body('announcements')
		.custom((array) => array === null || (Array.isArray(array) && array.every((item) => typeof item === 'object' && typeof item.announcement === 'string')))
		.withMessage('The value must be string array.'),
];