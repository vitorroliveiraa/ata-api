import minutesRepository from '../repositories/updateMinutesRepository.js';
import { validationResult } from 'express-validator';

const updateMinutesById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const { id } = req.params;
		const newMinutes = req.body;

		await minutesRepository.updateMinutesById(id, newMinutes);
		res.status(201).json({ message: 'Minutes updated successfully!' });

	} catch (error) {
		return res.status(error.statusCode).json(error.message);
	}
};

export default {
	updateMinutesById
}