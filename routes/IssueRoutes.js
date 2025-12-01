import express from 'express';
import { 
  getIssueById, 
  getIssues, 
  getLecturerIssues, 
  updateIssuePriority, 
  updateIssueStatus,
  getIssueStats
} from '../controllers/IssueController.js';

const router = express.Router();

// ADMIN ONLY ROUTES
router.get('/', getIssues);
router.get('/stats', getIssueStats);
router.get('/:id', getIssueById);
router.get('/lecturer/:lecturerId', getLecturerIssues);
router.put('/:id/status', updateIssueStatus);  // Use req.params.id in controller
router.put('/:id/priority', updateIssuePriority); // Use req.params.id in controller

export default router;