import express from 'express';
import { getLecturers, getLecturerById } from '../controllers/LectuererController.js';


const router = express.Router();

router.get('/', getLecturers);
router.get('/:id', getLecturerById);

export default router;