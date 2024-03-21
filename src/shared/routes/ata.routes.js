import { Router } from 'express';

import insertMinutesController from '../../controllers/insertMinutesController.js';
import getMinutesByIdController from '../../controllers/getMinutesByIdController.js';
import getAllMinutesController from '../../controllers/getAllMinutesController.js';
import updateMinutesController from '../../controllers/updateMinutesController.js';

import { dataValidation } from '../middlewares/validations.js';

const minutesRoutes = Router();

minutesRoutes.post('/insert', dataValidation, insertMinutesController.insertMinutes);
minutesRoutes.get('/search/:id', getMinutesByIdController.getMinutesById);
minutesRoutes.get('/search', getAllMinutesController.getAllMinutes);
minutesRoutes.patch('/update/:id', dataValidation, updateMinutesController.updateMinutesById);

export default minutesRoutes;