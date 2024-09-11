const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/', mentorController.createMentor); // Create mentor
router.post('/:mentorId/students', mentorController.assignStudentsToMentor); // Assign multiple students
router.get('/:mentorId/students', mentorController.getStudentsByMentor); // Get students for a mentor

module.exports = router;
