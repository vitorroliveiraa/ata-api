import minutesRepository from '../repositories/getAllMinutesRepository.js';

const getAllMinutes = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const minutes = await minutesRepository.getAllMinutes(page, limit);
    res.status(200).json(minutes);

  } catch (error) {
    return res.status(error.statusCode).json(error.message);
  }
};

export default {
  getAllMinutes
}