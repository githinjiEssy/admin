import express from 'express';
import { getStudents, getStudentById } from '../controllers/StudentController.js';

const router = express.Router();

// This will handle GET /students (the base route)
router.get('/', getStudents);
router.get('/:id', getStudentById);

// If you want other routes, add them here:
// router.get('/:id', getStudentById);
// router.post('/', createStudent);
// router.put('/:id', updateStudent);
// router.delete('/:id', deleteStudent);

export default router;