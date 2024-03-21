import minutesRepository from '../repositories/insertMinutesRepository.js';
import { validationResult } from 'express-validator';

const insertMinutes = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const { sacramentMeeting, testimonies, sustainingAndReleasing, announcements } = req.body;

		await minutesRepository.insertMinutes(sacramentMeeting, testimonies, sustainingAndReleasing, announcements);
		res.status(201).json({ message: 'Minutes inserted successfully!' });
	} catch (error) {
		return res.status(error.statusCode).json(error.message);
	}
};

export default {
	insertMinutes
}