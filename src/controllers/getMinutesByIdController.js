import minutesRepository from '../repositories/getMinutesByIdRepository.js';

const getMinutesById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const minutes = await minutesRepository.getMinutesById(Number(id));
    res.status(200).json(minutes);

  } catch (error) {
    return res.status(error.statusCode).json(error.message);
  }
};

export default {
  getMinutesById
}